'use client';

import React from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';

interface MonacoEditorProps extends Partial<EditorProps> {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
}

export function MonacoEditor({ value, onChange, language = 'javascript', ...props }: MonacoEditorProps) {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        ...props.options,
      }}
      {...props}
    />
  );
}
