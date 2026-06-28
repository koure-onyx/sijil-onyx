# Sijil — Frontend Blueprint: Rendering Engine

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

The BlockRenderer is the core component for rendering topic content. This document defines the polymorphic renderer architecture, all 17 block type renderers, and the registry pattern for extensibility.

---

## BlockRenderer Architecture

### Registry Pattern

```typescript
// features/topics/components/BlockRenderer.tsx
import { HeadingBlock } from './blocks/HeadingBlock';
import { ParagraphBlock } from './blocks/ParagraphBlock';
import { FormulaBlock } from './blocks/FormulaBlock';
// ... other block imports

type BlockType = 
  | 'heading'
  | 'paragraph'
  | 'formula'
  | 'figure'
  | 'table'
  | 'callout'
  | 'mcq'
  | 'example'
  | 'list'
  | 'definition'
  | 'learning_outcomes'
  | 'comparison_view'
  | 'quran_verse'
  | 'quran_reference'
  | 'activity'
  | 'equation'
  | 'numerical';

interface BlockData {
  type: BlockType;
  id: string;
  [key: string]: unknown;
}

interface BlockRendererProps {
  blocks: BlockData[];
  options?: {
    showLatex?: boolean;
    showAnswers?: boolean;
  };
}

const blockRegistry: Record<BlockType, React.ComponentType<any>> = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  formula: FormulaBlock,
  figure: FigureBlock,
  table: TableBlock,
  callout: CalloutBlock,
  mcq: MCQBlock,
  example: ExampleBlock,
  list: ListBlock,
  definition: DefinitionBlock,
  learning_outcomes: LearningOutcomesBlock,
  comparison_view: ComparisonViewBlock,
  quran_verse: QuranVerseBlock,
  quran_reference: QuranReferenceBlock,
  activity: ActivityBlock,
  equation: EquationBlock,
  numerical: NumericalBlock,
};

export function BlockRenderer({ blocks, options = {} }: BlockRendererProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        const BlockComponent = blockRegistry[block.type];
        
        if (!BlockComponent) {
          console.warn(`Unknown block type: ${block.type}`);
          return null;
        }
        
        return (
          <BlockComponent 
            key={block.id || `block-${index}`}
            {...block}
            options={options}
          />
        );
      })}
    </div>
  );
}
```

---

## Block Renderers

### 1. HeadingBlock

```typescript
// features/topics/components/blocks/HeadingBlock.tsx
interface HeadingBlockProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  slugAnchor?: string;
}

export function HeadingBlock({ level, text, slugAnchor }: HeadingBlockProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const className = {
    1: 'text-4xl font-bold mt-8 mb-4',
    2: 'text-3xl font-bold mt-6 mb-3',
    3: 'text-2xl font-semibold mt-5 mb-2',
    4: 'text-xl font-semibold mt-4 mb-2',
    5: 'text-lg font-medium mt-3 mb-1',
    6: 'text-base font-medium mt-2',
  }[level];
  
  return (
    <Tag id={slugAnchor} className={className}>
      <a href={`#${slugAnchor}`} className="group">
        {text}
        <span className="ml-2 opacity-0 group-hover:opacity-100">#</span>
      </a>
    </Tag>
  );
}
```

### 2. ParagraphBlock

```typescript
// features/topics/components/blocks/ParagraphBlock.tsx
interface ParagraphBlockProps {
  html: string;
  containsFormula?: boolean;
  keyTerms?: string[];
}

export function ParagraphBlock({ html, containsFormula, keyTerms }: ParagraphBlockProps) {
  return (
    <p 
      className="text-lg leading-relaxed my-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

### 3. FormulaBlock

```typescript
// features/topics/components/blocks/FormulaBlock.tsx
import { LatexRenderer } from '@/components/display/LatexRenderer';

interface FormulaBlockProps {
  formulaId: string;
  name: string;
  latex: string;
  text: string;
  variables: Array<{ symbol: string; description: string }>;
  formulaType: string;
}

export function FormulaBlock({ formulaId, name, latex, text, variables }: FormulaBlockProps) {
  return (
    <div className="my-8 p-6 bg-gray-50 rounded-lg border">
      <div className="text-center mb-4">
        <h4 className="font-semibold mb-2">{name}</h4>
        <LatexRenderer latex={latex} displayMode />
      </div>
      
      {text && <p className="text-sm text-gray-600 mb-4">{text}</p>}
      
      {variables.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h5 className="text-sm font-medium mb-2">Variables:</h5>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {variables.map(v => (
              <li key={v.symbol} className="flex">
                <code className="font-mono mr-2">{v.symbol}</code>
                <span>: {v.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### 4. FigureBlock

```typescript
// features/topics/components/blocks/FigureBlock.tsx
import { ResponsiveImage } from '@/components/display/ResponsiveImage';

interface FigureBlockProps {
  figureNumber: number;
  caption: string;
  alt: string;
  imageUrl: string;
  svgCode?: string;
  hasLabels: boolean;
}

export function FigureBlock({ figureNumber, caption, alt, imageUrl, svgCode }: FigureBlockProps) {
  return (
    <figure className="my-8">
      <div className="border rounded-lg overflow-hidden">
        {svgCode ? (
          <div dangerouslySetInnerHTML={{ __html: svgCode }} />
        ) : (
          <ResponsiveImage src={imageUrl} alt={alt} />
        )}
      </div>
      <figcaption className="mt-3 text-center text-sm text-gray-600">
        <strong>Figure {figureNumber}:</strong> {caption}
      </figcaption>
    </figure>
  );
}
```

### 5. TableBlock

```typescript
// features/topics/components/blocks/TableBlock.tsx
interface TableBlockProps {
  tableNumber: number;
  caption: string;
  headers: string[];
  rows: string[][];
  renderAs: 'styled-table' | 'chart' | 'infographic';
}

export function TableBlock({ tableNumber, caption, headers, rows }: TableBlockProps) {
  return (
    <figure className="my-8 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, i) => (
              <th key={i} className="border px-4 py-2 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-3 text-sm text-gray-600">
        <strong>Table {tableNumber}:</strong> {caption}
      </figcaption>
    </figure>
  );
}
```

### 6. CalloutBlock

```typescript
// features/topics/components/blocks/CalloutBlock.tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type CalloutVariant = 'note' | 'warning' | 'tip' | 'important' | 'caution';

interface CalloutBlockProps {
  variant: CalloutVariant;
  title: string;
  text: string;
  icon?: string;
}

const variantStyles: Record<CalloutVariant, string> = {
  note: 'bg-blue-50 border-blue-200',
  warning: 'bg-yellow-50 border-yellow-200',
  tip: 'bg-green-50 border-green-200',
  important: 'bg-red-50 border-red-200',
  caution: 'bg-orange-50 border-orange-200',
};

export function CalloutBlock({ variant, title, text }: CalloutBlockProps) {
  return (
    <Alert className={`${variantStyles[variant]} my-6`}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}
```

### 7. MCQBlock

```typescript
// features/topics/components/blocks/MCQBlock.tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface MCQBlockProps {
  mcqId: string;
  questionText: string;
  options: Array<{ label: string; text: string }>;
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function MCQBlock({ mcqId, questionText, options, correctAnswer, explanation, difficulty }: MCQBlockProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
  return (
    <div className="my-8 p-6 border rounded-lg bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Multiple Choice Question</h4>
        <Badge variant={difficulty === 'easy' ? 'success' : difficulty === 'medium' ? 'warning' : 'destructive'}>
          {difficulty}
        </Badge>
      </div>
      
      <p className="mb-4">{questionText}</p>
      
      <RadioGroup value={selected || undefined} onValueChange={setSelected}>
        {options.map(opt => (
          <div key={opt.label} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={opt.label} id={`${mcqId}-${opt.label}`} />
            <label htmlFor={`${mcqId}-${opt.label}`} className="flex-1 cursor-pointer">
              {opt.text}
            </label>
          </div>
        ))}
      </RadioGroup>
      
      <Button 
        className="mt-4"
        onClick={() => setShowAnswer(true)}
        disabled={!selected}
      >
        Check Answer
      </Button>
      
      {showAnswer && (
        <div className="mt-4 p-4 bg-white rounded border">
          <p className={selected === correctAnswer ? 'text-green-600' : 'text-red-600'}>
            {selected === correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="mt-2 text-sm"><strong>Explanation:</strong> {explanation}</p>
        </div>
      )}
    </div>
  );
}
```

### 8. ExampleBlock

```typescript
// features/topics/components/blocks/ExampleBlock.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ExampleBlockProps {
  exampleNumber: number;
  title: string;
  problemText: string;
  solutionSteps: string[];
  finalAnswer: string;
}

export function ExampleBlock({ exampleNumber, title, problemText, solutionSteps, finalAnswer }: ExampleBlockProps) {
  return (
    <div className="my-8 p-6 border-l-4 border-blue-500 bg-blue-50">
      <h4 className="font-semibold mb-2">Example {exampleNumber}: {title}</h4>
      
      <div className="mb-4">
        <strong>Problem:</strong>
        <p className="mt-1">{problemText}</p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="solution">
          <AccordionTrigger>Show Solution</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              {solutionSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <p className="font-semibold">
              <strong>Answer:</strong> {finalAnswer}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

### 9-17. Remaining Block Renderers

```typescript
// features/topics/components/blocks/ListBlock.tsx
export function ListBlock({ listType, items }: { listType: 'ordered' | 'unordered'; items: string[] }) {
  const Tag = listType === 'ordered' ? 'ol' : 'ul';
  return (
    <Tag className={`${listType === 'ordered' ? 'list-decimal' : 'list-disc'} list-inside my-4 space-y-1`}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </Tag>
  );
}

// features/topics/components/blocks/DefinitionBlock.tsx
export function DefinitionBlock({ term, definitionText }: { term: string; definitionText: string }) {
  return (
    <dl className="my-4">
      <dt className="font-semibold">{term}</dt>
      <dd className="ml-4 text-gray-700">{definitionText}</dd>
    </dl>
  );
}

// features/topics/components/blocks/LearningOutcomesBlock.tsx
export function LearningOutcomesBlock({ outcomes }: { outcomes: string[] }) {
  return (
    <div className="my-6 p-4 bg-green-50 border border-green-200 rounded">
      <h4 className="font-semibold mb-2">Learning Outcomes</h4>
      <ul className="list-check space-y-1">
        {outcomes.map((outcome, i) => <li key={i}>{outcome}</li>)}
      </ul>
    </div>
  );
}

// features/topics/components/blocks/ComparisonViewBlock.tsx
export function ComparisonViewBlock({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-8">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((h, i) => <th key={i} className="border px-4 py-2">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => <td key={ci} className="border px-4 py-2">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// features/topics/components/blocks/QuranVerseBlock.tsx
export function QuranVerseBlock({ surah, ayah, urduTranslation, wordAlignments }: any) {
  return (
    <div className="my-6 p-4 bg-amber-50 border-r-4 border-amber-500" dir="rtl">
      <p className="font-arabic text-2xl mb-2">{urduTranslation}</p>
      <p className="text-sm text-gray-600">Surah {surah}, Ayah {ayah}</p>
    </div>
  );
}

// features/topics/components/blocks/QuranReferenceBlock.tsx
export function QuranReferenceBlock({ surah, ayahStart, ayahEnd, curriculumId }: any) {
  return (
    <div className="my-4 italic text-gray-600">
      Quran Reference: Surah {surah}, Ayah {ayahStart}-{ayahEnd}
    </div>
  );
}

// features/topics/components/blocks/ActivityBlock.tsx
export function ActivityBlock({ title, activityType, apparatus, procedureSteps, precautions }: any) {
  return (
    <div className="my-8 p-6 border rounded-lg bg-purple-50">
      <h4 className="font-semibold mb-2">Activity: {title}</h4>
      {apparatus && <p><strong>Apparatus:</strong> {apparatus}</p>}
      <ol className="list-decimal list-inside mt-4 space-y-2">
        {procedureSteps?.map((step: string, i: number) => <li key={i}>{step}</li>)}
      </ol>
      {precautions && <p className="mt-4 text-sm text-red-600"><strong>Precautions:</strong> {precautions}</p>}
    </div>
  );
}

// features/topics/components/blocks/EquationBlock.tsx
import { LatexRenderer } from '@/components/display/LatexRenderer';

export function EquationBlock({ inline, latex }: { inline: boolean; latex: string }) {
  return <LatexRenderer latex={latex} displayMode={!inline} />;
}

// features/topics/components/blocks/NumericalBlock.tsx
export function NumericalBlock({ problemText, givenData, required, solution }: any) {
  return (
    <div className="my-6 p-4 border rounded">
      <p><strong>Problem:</strong> {problemText}</p>
      {givenData && <p><strong>Given:</strong> {givenData}</p>}
      {required && <p><strong>Required:</strong> {required}</p>}
      {solution && <details className="mt-2"><summary>Solution</summary>{solution}</details>}
    </div>
  );
}
```

---

## Renderer Registry Extension

For custom block types not in the core set:

```typescript
// lib/block-registry.ts
import { BlockRendererProps } from '@/features/topics/components/BlockRenderer';

type CustomBlockRenderer = React.ComponentType<any>;

class BlockRegistry {
  private renderers: Map<string, CustomBlockRenderer> = new Map();
  
  register(type: string, renderer: CustomBlockRenderer) {
    this.renderers.set(type, renderer);
  }
  
  get(type: string): CustomBlockRenderer | undefined {
    return this.renderers.get(type);
  }
  
  has(type: string): boolean {
    return this.renderers.has(type);
  }
}

export const blockRegistry = new BlockRegistry();
```

---

## Related Documents

- [05-component-architecture.md](./05-component-architecture.md) — Component tree
- [07-api-layer.md](./07-api-layer.md) — API clients
- [09-component-inventory.md](../frontend-discovery/09-component-inventory.md) — Component reference
