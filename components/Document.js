import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { useRouter } from 'next/router';
import { Editor, useMarkdocCode } from './Sandbox';
import { EditPagePanel } from './EditPagePanel';
import { PrevNext } from './Shell';
import { Feedback } from './Feedback';

function EditPage({ source: initialDocument }) {
  const router = useRouter();
  const [doc, setDoc] = React.useState(initialDocument);
  const { content, config, errors } = useMarkdocCode(doc);

  // Exclude feedback and prev/next from landing page and sandbox
  const excludedPaths = ['/', '/sandbox'];
  const showFeedback = !excludedPaths.includes(router.pathname);
  const showPrevNext = !excludedPaths.includes(router.pathname);

  return (
    <>
      {Markdoc.renderers.react(content.children, React, {
        components: config.components
      })}
      {showPrevNext && <PrevNext />}
      {showFeedback && <Feedback />}
      <EditPagePanel>
        <Editor code={doc} onChange={setDoc} errors={errors} />
      </EditPagePanel>
    </>
  );
}

export function Document({ source, children }) {
  const router = useRouter();
  
  // Exclude feedback and prev/next from landing page and sandbox
  const excludedPaths = ['/', '/sandbox'];
  const showFeedback = !excludedPaths.includes(router.pathname);
  const showPrevNext = !excludedPaths.includes(router.pathname);

  /**
   * Typically you would just render children here, but we are adding
   * this extra branch in order to pop up the editor that reveals
   * the source content for each document
   */
  return (
    <article>
      {source ? <EditPage source={source} /> : (
        <>
          {children}
          {showPrevNext && <PrevNext />}
          {showFeedback && <Feedback />}
        </>
      )}
    </article>
  );
}
