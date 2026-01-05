export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    id: 1,
    slug: "react-hooks-guide",
    title: "Полное руководство по React Hooks",
    excerpt: "Узнайте, как использовать React Hooks для создания функциональных компонентов с состоянием.",
    date: "2025-01-15",
    readTime: 8,
    tags: ["React", "JavaScript", "Hooks"],
    content: `<h2>Введение</h2><p>React Hooks позволили писать компоненты как функции и при этом использовать состояние, эффекты и другие возможности React без классов.</p><p>Хуки - это функции, которые принято узнавать по префиксу <code>use</code>, и они вызываются внутри React-компонентов (или внутри ваших кастомных хуков).</p><p>В этом руководстве разобраны базовые хуки (<code>useState</code>, <code>useEffect</code>), а также практичные дополнения (<code>useRef</code>, <code>useMemo</code>, <code>useCallback</code>, <code>useContext</code>, <code>useReducer</code>) и паттерны для реальных проектов.</p>

<h2>Правила хуков</h2><p>Чтобы хуки работали корректно, важно соблюдать два базовых правила.</p><ul><li>Вызывайте хуки только на верхнем уровне компонента - не внутри условий, циклов и вложенных функций, чтобы порядок вызовов был одинаковым на каждом рендере.</li><li>Вызывайте хуки только из React-функций: функциональных компонентов или кастомных хуков, а не из «обычных» JS-функций.</li></ul><p>Для автоматической проверки используют <code>eslint-plugin-react-hooks</code>, который включает правила <code>rules-of-hooks</code> и <code>exhaustive-deps</code>. </p>

<h2>useState Hook</h2><p><code>useState</code> - хук, который добавляет переменную состояния в функциональный компонент и возвращает пару: текущее значение и функцию обновления. </p><p>Мини-шаблон выглядит так: <code>const [value, setValue] = useState(initialValue)</code>. </p>

<h3>Базовый пример</h3>
<pre><code class="language-jsx">import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Clicks: {count}</p>
      <button onClick={() => setCount(count + 1)}>Plus</button>
    </div>
  );
}</code></pre>

<h3>Практические советы</h3><ul><li>Если новое состояние зависит от предыдущего, используйте функциональное обновление, чтобы избежать проблем со «старыми» значениями при серии обновлений. </li><li>Храните в состоянии только то, что участвует в рендере, а значения «для логики» (таймеры, счетчики кликов в обработчиках) часто удобнее хранить в <code>useRef</code>. </li></ul>

<h2>useEffect Hook</h2><p><code>useEffect</code> нужен для побочных эффектов в функциональных компонентах (например, загрузка данных, подписки, ручные обращения к DOM и т.д.). </p><p>По умолчанию эффект запускается после первого рендера и после каждого последующего обновления. </p><p>Если эффект возвращает функцию, React использует её как механизм очистки (cleanup). </p>

<h3>Зависимости и очистка</h3><ul><li>React выполняет очистку эффекта при размонтировании компонента, а также очищает эффект предыдущего рендера перед запуском следующего, что помогает избегать утечек и несоответствий. </li><li>Чтобы пропускать лишние запуски эффекта, передавайте массив зависимостей вторым аргументом <code>useEffect(..., [deps])</code>. </li><li>Если в эффекте используются значения из области видимости компонента (props/state), их нужно учитывать в зависимостях, иначе можно получить баги со «старыми» значениями. </li></ul>

<h3>Пример: подписка + cleanup</h3>
<pre><code class="language-jsx">import { useEffect } from 'react';

export function ResizeLogger() {
  const onResize = () => console.log('resize', window.innerWidth);
  window.addEventListener('resize', onResize);

  return () => {
    window.removeEventListener('resize', onResize);
  };
}, []);

  return <div>Open console and resize window</div>;
}</code></pre>

<h3>Пример: загрузка данных (с отменой)</h3>
<pre><code class="language-jsx">import { useEffect, useState } from 'react';

export function User({ id }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setError(null);
        const res = await fetch(\`/api/users/\${id}\`, { signal: controller.signal });
        if (!res.ok) throw new Error('Request failed');
        setData(await res.json());
      } catch (e) {
        if (e.name !== 'AbortError') setError(e);
      }
    })();

    return () => controller.abort();
  }, [id]);

  if (error) return <p>Error</p>;
  if (!data) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}</code></pre>

<h3>Частая ловушка: «useEffect срабатывает дважды»</h3><p>В dev-режиме при включённом Strict Mode можно заметить повторные срабатывания эффектов на старте, и это обычно связано с дополнительными проверками корректности побочных эффектов и очистки. </p>

<h2>useRef Hook</h2><p><code>useRef</code> позволяет хранить значение, которое должно переживать ререндеры, но само по себе не обязано участвовать в отображении. </p><p><code>useRef(initialValue)</code> возвращает объект с полем <code>current</code>, которое можно менять без запуска ререндера. </p>

<h3>Пример: хранение id таймера</h3>
<pre><code class="language-jsx">import { useEffect, useRef, useState } from 'react';

export function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return <div>{seconds}s</div>;
}</code></pre>

<h2>useMemo и useCallback</h2><p><code>useMemo</code> кэширует результат вычисления между ререндерами, пока зависимости не изменятся. </p><p><code>useCallback</code> кэширует (стабилизирует) ссылку на функцию между ререндерами, пока зависимости не изменятся. </p>

<h3>Когда это реально нужно</h3><ul><li><code>useMemo</code> полезен для дорогих вычислений или чтобы не создавать новый объект/массив на каждый рендер, если это ломает оптимизации ниже по дереву. </li><li><code>useCallback</code> полезен, когда вы передаёте колбэк в дочерний компонент (особенно если он мемоизирован) или используете колбэк в зависимостях другого хука. </li></ul>

<h3>Пример: стабилизация обработчика</h3>
<pre><code class="language-jsx">import { useCallback, useState } from 'react';

export function Form() {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // send(value)
  }, [value]);

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}</code></pre>

<h2>useContext Hook</h2><p><code>useContext</code> читает и «подписывает» компонент на значение контекста, которое передаёт ближайший Provider выше по дереву. </p><p>Если Provider отсутствует, возвращается <code>defaultValue</code>, указанный при <code>createContext(defaultValue)</code>. </p><p>Когда значение контекста меняется, React автоматически перерендерит компоненты, которые его читают. </p>

<h3>Мини-пример</h3>
<pre><code class="language-jsx">import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>OK</button>;
}

export function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Button />
    </ThemeContext.Provider>
  );
}</code></pre>

<h2>useReducer Hook</h2><p><code>useReducer</code> удобно использовать, когда логика обновления состояния становится сложной (много полей, много типов событий, цепочки переходов). </p><p>Паттерн похож на Redux: есть <code>reducer(state, action) => newState</code> и <code>dispatch(action)</code>, который запускает обновление. </p>

<h3>Пример: счётчик на reducer</h3>
<pre><code class="language-jsx">import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'inc':
      return { count: state.count + 1 };
    case 'dec':
      return { count: state.count - 1 };
    default:
      throw new Error('Unknown action');
  }
}

export function CounterReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'dec' })}>-</button>
      <button onClick={() => dispatch({ type: 'inc' })}>+</button>
    </div>
  );
}</code></pre>

<h2>Кастомные хуки</h2><p>Кастомный хук - это функция, которая переиспользует логику на базе других хуков и помогает делить код по смыслу, а не по «жизненным циклам». </p><p>Обычно кастомные хуки начинаются с <code>use</code> и могут возвращать данные/методы, которые удобно использовать в компонентах. </p>

<h3>Пример: useLocalStorage</h3>
<pre><code class="language-jsx">import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}</code></pre>

<h2>Чеклист: частые ошибки</h2><ul><li>Не вызывайте хуки условно - условие переносите внутрь эффекта/логики, иначе React «потеряет» соответствие состояния порядку вызовов. </li><li>Не забывайте cleanup для подписок/таймеров/обработчиков событий, иначе получите утечки и странные баги при обновлениях и размонтировании. </li><li>Не пытайтесь «лечить» неправильные зависимости в эффекте удалением значений из массива зависимостей - чаще это маскирует проблему со «старыми» значениями. </li><li>Не используйте <code>useMemo</code>/<code>useCallback</code> «везде подряд»: это инструмент оптимизации, который имеет смысл, когда есть реальная причина стабилизировать ссылку или кэшировать дорогой расчёт. </li></ul>`
  },
  {
    id: 2,
    slug: "typescript-best-practices",
    title: "Лучшие практики TypeScript",
    excerpt: "Как правильно использовать TypeScript для масштабируемых приложений.",
    date: "2025-01-10",
    readTime: 12,
    tags: ["TypeScript", "Best Practices"],
    content: `<h2>Зачем нужен TypeScript?</h2><p>TypeScript даёт статическую типизацию и проверки на этапе разработки, чтобы раньше находить ошибки, которые в JavaScript проявились бы только во время выполнения.</p><p>Основная идея практик ниже - сделать типы «источником правды»: типы описывают модель данных, а компилятор и линтер помогают удерживать код в согласованном состоянии по мере роста проекта.</p>

<h2>Типы и интерфейсы</h2><p>В TypeScript есть два близких инструмента для описания формы объектов: <code>interface</code> и <code>type</code> (type alias), и оба широко применяются в реальных кодовых базах.</p><p>Интерфейсы умеют описывать не только объектные типы, но и функциональные типы через <em>call signature</em> (сигнатуру вызова).</p>

<h3>Когда чаще выбирают interface</h3><ul><li><strong>Расширение</strong> через <code>extends</code> хорошо читается, когда нужно «наращивать» контракт объекта по мере усложнения домена.</li><li>Интерфейсы поддерживают «слияние объявлений» (declaration merging): если в одной области видимости есть несколько деклараций с одинаковым именем, компилятор объединяет их в одну.</li></ul>

<h3>Когда чаще выбирают type</h3><ul><li>Type alias удобно использовать для объединений (union) и пересечений (intersection), потому что эти конструкции - часть повседневной типизации.</li><li>Type alias хорошо подходит для композиции типов через <code>|</code> и <code>&</code>, когда нужно собрать тип из нескольких вариантов или признаков.</li></ul>

<h3>Важно про конфликты при объединении</h3><p>TypeScript отдельно подчёркивает, что расширение интерфейсов и пересечение типов решают похожую задачу, но по-разному обрабатывают конфликты свойств, и это часто влияет на выбор подхода.</p>

<h2>Моделирование домена (масштабируемость)</h2><p>Масштабируемые приложения обычно выигрывают от точных моделей данных: вместо «широких» типов лучше описывать реальные варианты входных/выходных данных через union-типы.</p><p>Union-типы в TypeScript записываются через вертикальную черту <code>|</code> и означают «значение может быть одним из нескольких типов».</p>

<h3>Пример: union + сужение типов (narrowing)</h3><p>TypeScript умеет «сужать» типы (narrowing), используя знакомые JavaScript-проверки, чтобы внутри ветки кода работать с более конкретным типом.</p>
<pre><code class="language-ts">type ApiResult = { ok: true; data: string } | { ok: false; error: string };

function render(result: ApiResult) {
  if (result.ok) {
    // result: { ok: true; data: string }
    return result.data.toUpperCase();
  }

  // result: { ok: false; error: string }
  return \`Error: \${result.error}\`;
}</code></pre>

<h3>Utility Types (встроенные типовые утилиты)</h3><p>В TypeScript есть набор глобально доступных utility types для типовых преобразований (например, «сделать поля необязательными», «выбрать подмножество полей» и т.д.).</p><p>Смысл практики - повторно использовать эти утилиты там, где они выражают намерение яснее, чем ручное переписывание похожих структур.</p>

<h2>Безопасные «границы» и any/never</h2><p>В типизации особенно важно аккуратно обрабатывать границы системы: JSON, внешние API, localStorage, параметры URL и любые «непроверенные» данные, потому что внутри приложения хочется опираться на гарантии типов.</p><p>TypeScript описывает специальные типы вроде <code>any</code> и <code>never</code>, причём <code>never</code> может появляться при сужении типов в ветках, которые логически недостижимы.</p>

<h3>Неприятная правда про any</h3><p><code>any</code> - это аварийный выход, который отключает пользу проверки типов на конкретном участке кода, поэтому в масштабируемых проектах его стараются локализовать у границ (например, сразу после парсинга/валидации), а не «разносить» внутрь бизнес-логики.</p>

<h3>Пример: проверка входных данных через narrowing</h3><p>Практика: вместо предположений о форме входного значения, сначала выполняется проверка, после чего TypeScript сможет корректнее проверить дальнейший код за счёт narrowing.</p>
<pre><code class="language-ts">function isString(x: unknown): x is string {
  return typeof x === 'string';
}

function toSlug(x: unknown) {
  if (!isString(x)) return 'invalid';
  return x.trim().toLowerCase().replaceAll(' ', '-');
}</code></pre>

<h2>tsconfig: настройки, которые реально влияют</h2><p>Большая часть «лучших практик» в TypeScript на практике упирается в <code>tsconfig.json</code>, потому что именно настройки компилятора включают/выключают классы проверок.</p><p>Переход к более строгой конфигурации обычно обнаруживает реальные дефекты (например, неучтённые <code>undefined</code> при индексировании или неоднозначные опциональные поля) и делает поведение более предсказуемым.</p>

<h3>strict</h3><p>Опция <code>strict</code> включает набор строгих проверок компилятора, которые усиливают типобезопасность и чаще выявляют потенциальные проблемы при разработке.</p>

<h3>noUncheckedIndexedAccess</h3><p>Опция <code>noUncheckedIndexedAccess</code> добавляет <code>undefined</code> к типу результата при доступе по индексу, заставляя явно учитывать ситуацию «ключа/индекса нет».</p>
<pre><code class="language-ts">// При noUncheckedIndexedAccess: true
const arr: number[] = [];
const first = arr[0];
// first: number | undefined</code></pre>

<h3>exactOptionalPropertyTypes</h3><p>Опция <code>exactOptionalPropertyTypes</code> делает правила для опциональных свойств (<code>prop?</code>) более строгими и точнее различает «свойство отсутствует» и «свойство есть со значением undefined» в типовой модели.</p>

<h3>noEmit (тип-чек без сборки)</h3><p>Если сборку выполняет отдельный инструмент (например, bundler), TypeScript можно использовать как проверяющий шаг, включив <code>noEmit</code>, чтобы компилятор не генерировал JS-выход.</p>

<h3>isolatedModules</h3><p>Опция <code>isolatedModules</code> влияет на то, какие ограничения накладываются на код, когда каждый файл должен быть компилируем «в изоляции» (что часто важно при сборке не через <code>tsc</code>).</p>

<h3>Пример tsconfig для старта</h3>
<pre><code class="language-json">{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noEmit": true,
    "isolatedModules": true
  }
}</code></pre>

<h2>satisfies: проверяй форму, не теряя инференс</h2><p>В TypeScript 4.9 появился оператор <code>satisfies</code>, который позволяет проверить, что выражение соответствует заданному типу, при этом не меняя результирующий тип самого выражения.</p><p>Это особенно удобно для конфигов и таблиц соответствий, где хочется одновременно: (1) проверить форму и значения и (2) сохранить «узкие» литеральные типы для подсказок и безопасного доступа.</p>
<pre><code class="language-ts">type RouteConfig = Record<string, { title: string; auth: boolean }>;

const routes = {
  home: { title: 'Home', auth: false },
  dashboard: { title: 'Dashboard', auth: true }
} satisfies RouteConfig;

// routes сохраняет узкую структуру ключей home/dashboard,
// но компилятор проверяет, что значения соответствуют RouteConfig.</code></pre>

<h2>Линтинг TypeScript-кода</h2><p>Для больших проектов одного компилятора обычно недостаточно, потому что нужна единая дисциплина кода, и здесь часто используется typescript-eslint.</p><p>@typescript-eslint/eslint-plugin содержит «более 100» правил, которые обнаруживают нарушения best practices, потенциальные баги и/или стилистические проблемы именно в TypeScript-коде.</p>

<h3>Мини-чеклист для команды</h3><ul><li>Зафиксировать стиль и ошибки через ESLint + typescript-eslint, чтобы правила работали одинаково в IDE и CI.</li><li>Включить строгие опции в tsconfig и внедрять их постепенно (по модулю/папке), чтобы улучшения были управляемыми.</li><li>У границ системы использовать runtime-проверки (narrowing) и только после них работать с данными как с типизированными.</li></ul>`
  }
];