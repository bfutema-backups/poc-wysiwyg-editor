// import React, { useEffect, useRef, useState } from 'react';

// import { Button, Toolbar } from './WysiwygEditor.styles';

// export const WysiwygEditor: React.FC = () => {
//   const contentRef = useRef<HTMLDivElement>(null);

//   const [content, setContent] = useState<string>();

//   useEffect(() => {
//     const handleLinkClick = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;

//       if (target.tagName === 'A' && event.ctrlKey) {
//         event.preventDefault();
//         const url = (target as HTMLAnchorElement).href;
//         window.open(url, '_blank');
//       }
//     };

//     if (contentRef.current) {
//       contentRef.current.addEventListener('click', handleLinkClick);
//     }

//     return () => {
//       if (contentRef.current) {
//         contentRef.current.removeEventListener('click', handleLinkClick);
//       }
//     };
//   }, []);

//   function handleFormat(format: string, value = '') {
//     if (format === 'createLink') {
//       const displayText = window.prompt('Texto de Exibição:', '');
//       const url = window.prompt('URL:', 'http://');
//       const title = window.prompt('Título:', '');
//       const target = window.confirm('Abrir em nova janela?') ? '_blank' : '_self';

//       if (displayText && url) {
//         document.execCommand('insertHTML', false, `<a href="${url}" title="${title}" target="${target}">${displayText}</a>`);
//       }
//     } else {
//       document.execCommand(format, false, value);

//       if (format === 'insertUnorderedList' || format === 'insertOrderedList') {
//         const selection = window.getSelection();

//         if (selection && selection.anchorNode) {
//           const parentNode = selection.anchorNode.parentNode;

//           if (parentNode?.nodeType === Node.ELEMENT_NODE) {
//             const elementNode = parentNode as HTMLElement;
//             console.log(elementNode.tagName);

//             if (elementNode.tagName === 'UL' || elementNode.tagName === 'OL') {
//               elementNode.style.paddingLeft = '20px';
//               elementNode.style.listStyleType = value;
//             }
//           }
//         }
//       }
//     }
//   }

//   function handleContentChange() {
//     setContent(contentRef.current?.innerHTML);
//   }

//   function handleSave() {
//     console.log('Conteúdo Salvo:', content);
//   }

//   return (
//     <div>
//       <Toolbar>
//         <Button onClick={() => handleFormat('bold')}>B</Button>
//         <Button onClick={() => handleFormat('italic')}>I</Button>
//         <Button onClick={() => handleFormat('underline')}>U</Button>
//         <Button onClick={() => handleFormat('strikeThrough')}>S</Button>
//         |
//         <Button onClick={() => handleFormat('justifyLeft')}>{"<<"}</Button>
//         <Button onClick={() => handleFormat('justifyCenter')}>{"<>"}</Button>
//         <Button onClick={() => handleFormat('justifyRight')}>{">>"}</Button>
//         <Button onClick={() => handleFormat('justifyFull')}>{">>|"}</Button>
//         |
//         <Button onClick={() => handleFormat('insertUnorderedList')}>UL (Default)</Button>
//         <Button onClick={() => handleFormat('insertUnorderedList', 'circle')}>UL (Circle)</Button>
//         <Button onClick={() => handleFormat('insertUnorderedList', 'square')}>UL (Square)</Button>

//         <Button onClick={() => handleFormat('insertOrderedList')}>OL (Default)</Button>
//         <Button onClick={() => handleFormat('insertOrderedList', 'lower-alpha')}>OL (Lower Alpha)</Button>
//         <Button onClick={() => handleFormat('insertOrderedList', 'lower-greek')}>OL (Lower Greek)</Button>
//         <Button onClick={() => handleFormat('insertOrderedList', 'lower-roman')}>OL (Lower Roman)</Button>
//         <Button onClick={() => handleFormat('insertOrderedList', 'upper-alpha')}>OL (Upper Alpha)</Button>
//         <Button onClick={() => handleFormat('insertOrderedList', 'upper-roman')}>OL (Upper Roman)</Button>
//         |
//         <Button onClick={() => handleFormat('createLink')}>Link</Button>
//       </Toolbar>

//       <div
//         ref={contentRef}
//         contentEditable={true}
//         style={{
//           border: '1px solid #ccc',
//           minHeight: '100px',
//           padding: '16px',
//         }}
//         onInput={handleContentChange}
//       />

//       <button onClick={handleSave}>Salvar</button>
//     </div>
//   );
// };

import React, { useEffect, useRef, useState } from 'react';
import { Button, Toolbar } from './WysiwygEditor.styles';

export const WysiwygEditor: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string | undefined>();

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.tagName === 'A' && event.ctrlKey) {
        event.preventDefault();
        const url = (target as HTMLAnchorElement).href;
        window.open(url, '_blank');
      }
    };

    if (contentRef.current) {
      contentRef.current.addEventListener('click', handleLinkClick);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('click', handleLinkClick);
      }
    };
  }, []);

  const handleLink = () => {
    const displayText = window.prompt('Texto de Exibição:', '');
    const url = window.prompt('URL:', 'http://');
    const title = window.prompt('Título:', '') ?? '';
    const target = window.confirm('Abrir em nova janela?') ? '_blank' : '_self';

    if (displayText && url && contentRef.current) {
      const link = document.createElement('a');
      link.href = url;
      link.title = title;
      link.target = target;
      link.innerText = displayText;

      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(link);
      }
    }
  };

  const handleFormat = (format: string, value: string = '') => {
    if (format === 'createLink') {
      handleLink();
    } else {
      // document.execCommand(format, false, value);

      if (format === 'insertUnorderedList' || format === 'insertOrderedList') {
        const selection = window.getSelection();

        if (selection && selection.anchorNode) {
          const parentNode = selection.anchorNode.parentNode;

          if (parentNode?.nodeType === Node.ELEMENT_NODE) {
            const elementNode = parentNode as HTMLElement;

            if (elementNode.tagName === 'UL' || elementNode.tagName === 'OL') {
              elementNode.style.paddingLeft = '20px';
              elementNode.style.listStyleType = value;
            }
          }
        }
      }
    }
  };

  const handleContentChange = () => {
    setContent(contentRef.current?.innerHTML);
  };

  const handleSave = () => {
    console.log('Conteúdo Salvo:', content);
    // Lógica para salvar o conteúdo, como enviar para o servidor
  };

  return (
    <div>
      <Toolbar>
        <Button onClick={() => handleFormat('bold')}>B</Button>
        <Button onClick={() => handleFormat('italic')}>I</Button>
        <Button onClick={() => handleFormat('underline')}>U</Button>
        <Button onClick={() => handleFormat('strikeThrough')}>S</Button>
        |
        <Button onClick={() => handleFormat('justifyLeft')}>{"<<"}</Button>
        <Button onClick={() => handleFormat('justifyCenter')}>{"<>"}</Button>
        <Button onClick={() => handleFormat('justifyRight')}>{">>"}</Button>
        <Button onClick={() => handleFormat('justifyFull')}>{">>|"}</Button>
        |
        <Button onClick={() => handleFormat('insertUnorderedList')}>UL (Default)</Button>
        <Button onClick={() => handleFormat('insertUnorderedList', 'circle')}>UL (Circle)</Button>
        <Button onClick={() => handleFormat('insertUnorderedList', 'square')}>UL (Square)</Button>

        <Button onClick={() => handleFormat('insertOrderedList')}>OL (Default)</Button>
        <Button onClick={() => handleFormat('insertOrderedList', 'lower-alpha')}>OL (Lower Alpha)</Button>
        <Button onClick={() => handleFormat('insertOrderedList', 'lower-greek')}>OL (Lower Greek)</Button>
        <Button onClick={() => handleFormat('insertOrderedList', 'lower-roman')}>OL (Lower Roman)</Button>
        <Button onClick={() => handleFormat('insertOrderedList', 'upper-alpha')}>OL (Upper Alpha)</Button>
        <Button onClick={() => handleFormat('insertOrderedList', 'upper-roman')}>OL (Upper Roman)</Button>
        |
        <Button onClick={() => handleFormat('createLink')}>Link</Button>
      </Toolbar>

      <div
        ref={contentRef}
        contentEditable={true}
        style={{
          border: '1px solid #ccc',
          minHeight: '100px',
          padding: '16px',
        }}
        onInput={handleContentChange}
      />

      <button onClick={handleSave}>Salvar</button>
    </div>
  );
};
