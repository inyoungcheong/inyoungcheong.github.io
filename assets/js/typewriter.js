const TypewriterComponent = () => {
    const [text, setText] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [loopNum, setLoopNum] = React.useState(0);
    const [typingSpeed, setTypingSpeed] = React.useState(150);
  
    const verbs = ['ponder', 'critique', 'wrestle with', 'develop', 'scrutinize'];
    const institutions = ['Princeton', 'UW', 'SNU', 'United Nations', 'ACUS'];
    const verbColor = '#FF6B6B';
    const nounColor = '#4ECDC4';
  
    React.useEffect(() => {
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
  
    return React.createElement('div', { className: "text-3xl font-bold text-center" },
      React.createElement('span', { dangerouslySetInnerHTML: { __html: text } })
    );
  };
  
  // 컴포넌트 렌더링
  ReactDOM.render(
    React.createElement(TypewriterComponent),
    document.getElementById('typewriter-container')
  );