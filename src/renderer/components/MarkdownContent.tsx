/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unstable-nested-components */

import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import { SyntaxHighlighter, SyntaxHighlighterStyles } from '../untyped';

function Code({ node, inline, className, children, ...props }: any) {
  const match = /language-(\w+)/.exec(className || '');

  return !inline && match ? (
    <SyntaxHighlighter
      {...props}
      children={String(children).replace(/\n$/, '')}
      style={SyntaxHighlighterStyles.coldarkDark}
      className="rounded"
      language={match[1]}
      PreTag="div"
    />
  ) : (
    <code
      {...props}
      className="px-1 py-0.5 rounded text-xs bg-slate-950/50  text-slate-200"
    >
      {children}
    </code>
  );
}

function Paragraph({ node, ...props }: any) {
  return <p {...props} />;
}

function OrderedList({ node, ordered, children, ...props }: any) {
  return (
    <ol className="list-decimal" {...props}>
      {children.filter((child: never) => child !== '\n')}
    </ol>
  );
}

function List({ node, ordered, ...props }: any) {
  return <li className="pl-2 py-1" {...props} />;
}

function MarkdownContent({ ...props }: ReactMarkdownOptions) {
  return (
    <ReactMarkdown
      components={{
        p: Paragraph,
        ol: OrderedList,
        li: List,
        code: Code,
      }}
      {...props}
    />
  );
}

export default MarkdownContent;
