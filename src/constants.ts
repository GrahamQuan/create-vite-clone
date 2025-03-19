import { blue, yellow, green, cyan, red, magenta } from 'kolorist';

export interface FrameworkVariant {
  name: string;
  display: string;
  color: (str: string) => string;
  variants: TemplateVariant[];
}

export interface TemplateVariant {
  name: string;
  display: string;
  color: (str: string) => string;
}

export const FRAMEWORKS: FrameworkVariant[] = [
  {
    name: 'vanilla',
    display: 'Vanilla',
    color: yellow,
    variants: [
      {
        name: 'vanilla',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'vanilla-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'vue',
    display: 'Vue',
    color: green,
    variants: [
      {
        name: 'vue',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'vue-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'react',
    display: 'React',
    color: cyan,
    variants: [
      {
        name: 'react',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'react-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'preact',
    display: 'Preact',
    color: magenta,
    variants: [
      {
        name: 'preact',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'preact-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'lit',
    display: 'Lit',
    color: red,
    variants: [
      {
        name: 'lit',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'lit-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'svelte',
    display: 'Svelte',
    color: red,
    variants: [
      {
        name: 'svelte',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'svelte-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'solid',
    display: 'Solid',
    color: blue,
    variants: [
      {
        name: 'solid',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'solid-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
];
