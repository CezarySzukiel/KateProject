// import { useRef, useCallback } from 'react';

// export const useCaret = () => {
//   const inputRef = useRef(null);

//   const setRef = useCallback((node) => {
//     if (node) {
//       inputRef.current = node;
//     }
//   }, []);

//   const insertAtCaret = useCallback((char) => {
//     console.log('yyyyyyy', inputRef)
//         if (inputRef.current) {
//             console.log('insertAtCaret', inputRef);
//             const input = inputRef.current;
//             const start = input.selectionStart;
//             const end = input.selectionEnd;
//             const text = input.value;
//             const newText = text.slice(0, start) + char + text.slice(end);
//             input.value = newText; // Bezpośrednia aktualizacja wartości pola tekstowego
//             setTimeout(() => {
//                 input.setSelectionRange(start + char.length, start + char.length);
//                 input.focus();
//             }, 0);
//         } else {console.log('kurde')}
//     }, []);

//   return { setRef, insertAtCaret };
// };

export const insertAtCaret = useCallback((char) => {
    console.log('yyyyyyy', inputRef)
        if (inputRef.current) {
            console.log('insertAtCaret', inputRef);
            const input = inputRef.current;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const text = input.value;
            const newText = text.slice(0, start) + char + text.slice(end);
            input.value = newText; // Bezpośrednia aktualizacja wartości pola tekstowego
            setTimeout(() => {
                input.setSelectionRange(start + char.length, start + char.length);
                input.focus();
            }, 0);
        } else {console.log('kurde')}
    }, []);
