import React, { useState, useEffect } from 'react';

const TypewriterComponent = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const verbs = ['ponder', 'critique', 'wrestle with', 'develop', 'scrutinize'];
  const institutions = ['Princeton', 'UW', 'SNU', 'United Nations', 'ACUS'];
  const verbColor = '#FF6B6B'; // Coral pink
  const nounColor = '#4ECDC4'; // Turquoise

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % verbs.length;
      const fullTextVerb = `I <span style="color: ${verbColor};">${verbs[i]}</span> AI ethics`;
      const fullTextNoun = `at <span style="color: ${nounColor};">${institutions[i]}</span>`;
      const fullText = isDeleting ? fullTextVerb : fullTextNoun;

      setText(fullText.substring(0, text.length + (isDeleting ? -1 : 1)));

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="text-3xl font-bold text-center my-8">
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default TypewriterComponent;