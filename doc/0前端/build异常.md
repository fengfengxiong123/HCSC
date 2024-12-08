1. 报错1：
```
./src/components/logo.tsx
7:19  Error: Unsafe assignment of an `any` value.  @typescript-eslint/no-unsafe-assignment
7:38  Error: Unsafe assignment of an `any` value.  @typescript-eslint/no-unsafe-assignment
7:43  Error: Unsafe member access .blurDataURL on an `any` value.  @typescript-eslint/no-unsafe-member-access

 // TypeScript 编译器无法确定 LOGO 的类型，因此它将 LOGO 视为 any 类型
 // 需要确保 LOGO 具有明确的类型，并且它的 blurDataURL 属性也是明确的

<Image src={logo.src} blurDataURL={logo.blurDataURL} alt="Logo" fill />
 修改为
const logo = LOGO as { src: string; blurDataURL: string };
<Image src={logo.src} blurDataURL={logo.blurDataURL} alt="Logo" fill />

```
2. 报错2：
```
./src/app/(app)/profile/page.tsx
16:40 This assertion is unnecessary since it does not change the type of the expression.
// 原因：使用类型断言（Type Assertion）时，但该断言实际上并没有改变表达式的类型。这意味着编译器已经可以推断出正确的类型

const root = ReactDOM.createRoot(rootElement as HTMLElement);
修改为
const root = ReactDOM.createRoot(rootElement);
```
