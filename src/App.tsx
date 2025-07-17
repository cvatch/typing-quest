import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Star, ShoppingCart, Upload, Plus, Keyboard, Palette, Volume2 } from 'lucide-react';

const TypingTutorGame = () => {
  // Game state
  const [coins, setCoins] = useState(100);
  const [unlockedLetters, setUnlockedLetters] = useState(new Set(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']));
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showStore, setShowStore] = useState(false);
  const [showWordManager, setShowWordManager] = useState(false);
  const [gameStats, setGameStats] = useState({ correct: 0, total: 0 });
  const [wordStatus, setWordStatus] = useState('neutral'); // 'neutral', 'correct', 'incorrect'
  
  // Visual customization state
  const [theme, setTheme] = useState('blue');
  const [keyboardStyle, setKeyboardStyle] = useState('modern');
  const [backgroundPattern, setBackgroundPattern] = useState('none');
  const [fontStyle, setFontStyle] = useState('default');
  const [soundEffect, setSoundEffect] = useState('default');
  
  // Word lists
  const [wordLists, setWordLists] = useState([
    {
      id: 1,
      name: 'Basic Words',
      words: [
        "the", "of", "and", "to", "in", "i", "that", "was", "his", "he", "it", "with", "is", "for", "as", "had", "you", "not", "be", "her", "on", "at", "by", "which", "have", "or", "from", "this", "him", "but", "all", "she", "they", "were", "my", "are", "me", "one", "their", "so", "an", "said", "them", "we", "who", "would", "been", "will", "no", "when", "there", "if", "more", "out", "up", "into", "do", "any", "your", "what", "has", "man", "could", "other", "than", "our", "some", "very", "time", "upon", "about", "may", "its", "only", "now", "like", "little", "then", "can", "should", "made", "did", "us", "such", "a", "great", "before", "must", "two", "these", "see", "know", "over", "much", "down", "after", "first", "Mr", "good", "men", "own", "never", "most", "old", "shall", "day", "where", "those", "came", "come", "himself", "way", "work", "life", "without", "go", "make", "well", "through", "being", "long", "say", "might", "how", "am", "too", "even", "again", "many", "back", "here", "think", "every", "people", "went", "same", "last", "thought", "away", "under", "take", "found", "hand", "eyes", "still", "place", "while", "just", "also", "young", "yet", "though", "against", "things", "get", "ever", "give", "god", "years", "off", "face", "nothing", "right", "once", "another", "left", "part", "saw", "house", "world", "head", "three", "took", "new", "love", "always", "Mrs", "put", "night", "each", "king", "between", "tell", "mind", "heart", "few", "because", "thing", "whom", "far", "seemed", "looked", "called", "whole", "set", "both", "got", "find", "done", "heard", "look", "name", "days", "told", "let", "lord", "country", "asked", "going", "seen", "better", "having", "home", "knew", "side", "something", "moment", "father", "among", "course", "hands", "woman", "enough", "words", "mother", "soon", "full", "end", "gave", "room", "almost", "small", "thou", "cannot", "water", "want", "however", "light", "quite", "brought", "nor", "word", "whose", "given", "door", "best", "turned", "taken", "does", "use", "morning", "myself", "Gutenberg", "felt", "until", "since", "power", "themselves", "used", "rather", "began", "present", "voice", "others", "white", "works", "less", "money", "next", "poor", "death", "stood", "form", "within", "together", "till", "thy", "large", "matter", "kind", "often", "certain", "herself", "year", "friend", "half", "order", "round", "TRUE", "anything", "keep", "sent", "wife", "means", "believe", "passed", "feet", "near", "public", "state", "son", "hundred", "children", "thus", "hope", "alone", "above", "case", "dear", "thee", "says", "person", "high", "read", "city", "already", "received", "fact", "gone", "girl", "known", "hear", "times", "least", "perhaps", "sure", "indeed", "english", "open", "body", "itself", "along", "land", "return", "leave", "air", "nature", "answered", "either", "law", "help", "lay", "point", "child", "letter", "four", "wish", "fire", "cried", "women", "speak", "number", "therefore", "hour", "friends", "held", "free", "war", "during", "several", "business", "whether", "manner", "second", "reason", "replied", "united", "call", "general", "why", "behind", "became", "john", "become", "dead", "earth", "boy", "lost", "forth", "thousand", "looking", "I'll", "family", "soul", "feel", "coming", "England", "spirit", "question", "care", "truth", "ground", "really", "rest", "mean", "different", "making", "possible", "fell", "towards", "human", "kept", "short", "town", "following", "need", "cause", "met", "evening", "returned", "five", "strong", "able", "french", "live", "lady", "subject", "answer", "sea", "fear", "understand", "hard", "terms", "doubt", "around", "ask", "arms", "turn", "sense", "seems", "black", "bring", "followed", "beautiful", "close", "dark", "hold", "character", "sort", "sight", "ten", "show", "party", "fine", "ye", "ready", "story", "common", "book", "electronic", "talk", "account", "mark", "interest", "written", "can't", "bed", "necessary", "age", "else", "force", "idea", "longer", "art", "spoke", "across", "brother", "early", "ought", "sometimes", "line", "saying", "table", "appeared", "river", "continued", "eye", "sun", "information", "later", "everything", "reached", "suddenly", "past", "hours", "strange", "deep", "change", "miles", "feeling", "act", "meet", "paid", "further", "purpose", "happy", "added", "seem", "taking", "blood", "rose", "south", "beyond", "cold", "neither", "forward", "view", "I've", "position", "sound", "none", "entered", "clear", "road", "late", "stand", "suppose", "la", "daughter", "real", "nearly", "mine", "laws", "knowledge", "comes", "toward", "bad", "cut", "copy", "husband", "six", "France", "living", "peace", "didn't", "low", "north", "remember", "effect", "natural", "pretty", "fall", "fair", "service", "below", "except", "American", "hair", "London", "laid", "pass", "led", "copyright", "doing", "army", "run", "horse", "future", "opened", "pleasure", "history", "west", "pay", "red", "hath", "note", "although", "wanted", "gold", "makes", "desire", "play", "master", "office", "tried", "front", "big", "lived", "certainly", "wind", "receive", "attention", "government", "unto", "church", "strength", "length", "company", "placed", "paper", "letters", "probably", "glad", "important", "especially", "greater", "yourself", "fellow", "bear", "opinion", "window", "ran", "faith", "ago", "agreement", "charge", "beauty", "lips", "remained", "arm", "latter", "duty", "send", "distance", "silence", "foot", "wild", "object", "die", "save", "gentleman", "trees", "green", "trouble", "smile", "books", "wrong", "various", "sleep", "persons", "blockquote", "happened", "particular", "drew", "minutes", "hardly", "walked", "chief", "chance", "according", "beginning", "action", "deal", "loved", "visit", "thinking", "follow", "standing", "knows", "try", "presence", "heavy", "sweet", "plain", "donations", "immediately", "wrote", "mouth", "rich", "thoughts", "months", "won't", "afraid", "Paris", "single", "joy", "enemy", "broken", "unless", "states", "ship", "condition", "carry", "exclaimed", "including", "filled", "seeing", "influence", "write", "boys", "appear", "outside", "secret", "parts", "please", "appearance", "evil", "march", "george", "whatever", "slowly", "tears", "horses", "places", "caught", "stay", "instead", "struck", "blue", "York", "impossible", "period", "sister", "battle", "school", "Mary", "raised", "occasion", "married", "man's", "former", "food", "youth", "learned", "merely", "reach", "system", "twenty", "dinner", "quiet", "easily", "moved", "afterwards", "giving", "walk", "stopped", "laughed", "language", "expression", "week", "hall", "danger", "property", "wonder", "usual", "figure", "born", "court", "generally", "grew", "showed", "getting", "ancient", "respect", "third", "worth", "simple", "tree", "leaving", "remain", "society", "fight", "wall", "result", "heaven", "William", "started", "command", "tone", "regard", "expected", "mere", "month", "beside", "silent", "perfect", "experience", "street", "writing", "goes", "circumstances", "entirely", "fresh", "duke", "covered", "bound", "east", "wood", "stone", "quickly", "notice", "bright", "Christ", "boat", "noble", "meant", "somewhat", "sudden", "value", "direction", "chair", "due", "support", "tom", "date", "waiting", "Christian", "village", "lives", "reading", "agree", "lines", "considered", "field", "observed", "scarcely", "wished", "wait", "greatest", "permission", "success", "piece", "british", "Charles", "formed", "speaking", "trying", "conversation", "proper", "hill", "music", "opportunity", "that's", "German", "afternoon", "cry", "cost", "allowed", "girls", "considerable", "broke", "honour", "seven", "private", "sit", "news", "top", "scene", "discovered", "marriage", "step", "garden", "race", "begin", "per", "individual", "sitting", "learn", "political", "difficult", "bit", "speech", "Henry", "lie", "cast", "eat", "authority", "floor", "ill", "ways", "officers", "offered", "original", "happiness", "flowers", "produced", "summer", "provide", "study", "religion", "picture", "walls", "personal", "America", "watch", "pleased", "leaves", "declared", "hot", "understood", "effort", "prepared", "escape", "attempt", "supposed", "killed", "fast", "author", "Indian", "brown", "determined", "pain", "spring", "takes", "drawn", "soldiers", "houses", "beneath", "talking", "turning", "century", "steps", "intended", "soft", "straight", "matters", "likely", "corner", "trademark", "justice", "simply", "produce", "trust", "appears", "Rome", "laugh", "forget", "Europe", "passage", "eight", "closed", "ourselves", "gives", "dress", "passing", "terrible", "required", "medium", "efforts", "sake", "breath", "wise", "ladies", "possession", "pleasant", "perfectly", "o'", "memory", "usually", "grave", "fixed", "modern", "spot", "troops", "rise", "break", "fifty", "island", "meeting", "camp", "nation", "existence", "reply", "I'd", "copies", "sky", "touch", "equal", "fortune", "shore", "domain", "named", "situation", "looks", "promise", "orders", "degree", "middle", "winter", "plan", "spent", "allow", "pale", "conduct", "running", "religious", "surprise", "minute", "roman", "cases", "shot", "lead", "move", "names", "Word", "stop", "higher", "father's", "threw", "worse", "built", "spoken", "glass", "board", "vain", "affairs", "instance", "safe", "loss", "doctor"
      ]
    },
    {
      id: 2,
      name: 'Family Words',
      words: ['dad', 'lad', 'lass', 'fall', 'all', 'ask', 'sad']
    }
  ]);
  
  const [selectedWordList, setSelectedWordList] = useState(1);
  const [newWordList, setNewWordList] = useState({ name: '', words: '' });
  
  // Purchased items
  const [purchases, setPurchases] = useState({
    letters: new Set(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']),
    themes: new Set(['blue']),
    keyboards: new Set(['modern']),
    backgrounds: new Set(['none']),
    fonts: new Set(['default']),
    sounds: new Set(['default'])
  });
  
  const inputRef = useRef(null);
  
  // All letters that can be unlocked
  const allLetters = 'qwertyuiopasdfghjklzxcvbnm'.split('');
  
  // Store items
  const storeItems = {
    letters: allLetters.filter(letter => !purchases.letters.has(letter)).map(letter => ({
      id: letter,
      name: letter.toUpperCase(),
      price: 50,
      type: 'letter'
    })),
    themes: [
      { id: 'green', name: 'Forest Green', price: 30, type: 'theme' },
      { id: 'purple', name: 'Royal Purple', price: 30, type: 'theme' },
      { id: 'pink', name: 'Candy Pink', price: 30, type: 'theme' },
      { id: 'orange', name: 'Sunset Orange', price: 30, type: 'theme' },
      { id: 'red', name: 'Fire Red', price: 30, type: 'theme' }
    ].filter(theme => !purchases.themes.has(theme.id)),
    keyboards: [
      { id: 'retro', name: 'Retro Style', price: 40, type: 'keyboard' },
      { id: 'neon', name: 'Neon Glow', price: 50, type: 'keyboard' },
      { id: 'minimal', name: 'Minimalist', price: 35, type: 'keyboard' }
    ].filter(kb => !purchases.keyboards.has(kb.id)),
    backgrounds: [
      { id: 'dots', name: 'Polka Dots', price: 25, type: 'background' },
      { id: 'waves', name: 'Ocean Waves', price: 25, type: 'background' },
      { id: 'stars', name: 'Starry Night', price: 30, type: 'background' }
    ].filter(bg => !purchases.backgrounds.has(bg.id)),
    fonts: [
      { id: 'playful', name: 'Playful Font', price: 20, type: 'font' },
      { id: 'bold', name: 'Bold Font', price: 20, type: 'font' },
      { id: 'elegant', name: 'Elegant Font', price: 25, type: 'font' }
    ].filter(font => !purchases.fonts.has(font.id))
  };
  
  // Theme colors
  const themes = {
    blue: { primary: 'bg-blue-500', secondary: 'bg-blue-100', accent: 'text-blue-600', border: 'border-blue-300' },
    green: { primary: 'bg-green-500', secondary: 'bg-green-100', accent: 'text-green-600', border: 'border-green-300' },
    purple: { primary: 'bg-purple-500', secondary: 'bg-purple-100', accent: 'text-purple-600', border: 'border-purple-300' },
    pink: { primary: 'bg-pink-500', secondary: 'bg-pink-100', accent: 'text-pink-600', border: 'border-pink-300' },
    orange: { primary: 'bg-orange-500', secondary: 'bg-orange-100', accent: 'text-orange-600', border: 'border-orange-300' },
    red: { primary: 'bg-red-500', secondary: 'bg-red-100', accent: 'text-red-600', border: 'border-red-300' }
  };
  
  const currentTheme = themes[theme];
  
  // Background patterns
  const backgroundPatterns = {
    none: '',
    dots: 'bg-gradient-to-br from-white via-gray-50 to-gray-100',
    waves: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50',
    stars: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
  };
  
  // Font styles
  const fontStyles = {
    default: 'font-sans',
    playful: 'font-mono',
    bold: 'font-bold',
    elegant: 'font-serif'
  };
  
  // Get filtered words based on unlocked letters
  const getAvailableWords = () => {
    const currentList = wordLists.find(list => list.id === selectedWordList);
    if (!currentList) return [];
    
    return currentList.words.filter(word => 
      word.split('').every(letter => unlockedLetters.has(letter.toLowerCase()))
    );
  };
  
  // Get word display style based on status
  const getWordDisplayStyle = () => {
    const baseStyle = 'text-4xl font-bold mb-4 transition-colors duration-300';
    switch (wordStatus) {
      case 'correct':
        return `${baseStyle} text-green-500`;
      case 'incorrect':
        return `${baseStyle} text-red-500`;
      default:
        return `${baseStyle} ${currentTheme.accent}`;
    }
  };
  
  // Generate new word
  const generateNewWord = () => {
    const availableWords = getAvailableWords();
    if (availableWords.length === 0) {
      setCurrentWord('No words available with current letters');
      return;
    }
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(randomWord);
    setUserInput('');
    setWordStatus('neutral');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setUserInput(value);
    
    // Check if the input matches the beginning of the word
    const isCorrectSoFar = currentWord.toLowerCase().startsWith(value);
    
    if (value === currentWord.toLowerCase()) {
      // Complete word match
      setWordStatus('correct');
      handleCorrectWord();
    } else if (!isCorrectSoFar && value.length > 0) {
      // Wrong letter pressed
      setWordStatus('incorrect');
      handleIncorrectAttempt();
      // Skip to next word after a short delay
      setTimeout(() => {
        generateNewWord();
      }, 100);
    } else {
      // Still typing correctly
      setWordStatus('neutral');
    }
  };
  
  // Handle correct word
  const handleCorrectWord = () => {
    const wordLength = currentWord.length;
    const coinsEarned = Math.max(10, wordLength * 5 + (streak * 2));
    
    setCoins(prev => prev + coinsEarned);
    setScore(prev => prev + coinsEarned);
    setStreak(prev => prev + 1);
    setGameStats(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    
    setTimeout(() => {
      generateNewWord();
    }, 100);
  };
  
  // Handle incorrect attempt
  const handleIncorrectAttempt = () => {
    setStreak(0);
    setGameStats(prev => ({ correct: prev.correct, total: prev.total + 1 }));
  };
  
  // Purchase item
  const purchaseItem = (item) => {
    if (coins >= item.price) {
      setCoins(prev => prev - item.price);
      
      const newPurchases = { ...purchases };
      newPurchases[item.type + 's'].add(item.id);
      setPurchases(newPurchases);
      
      if (item.type === 'letter') {
        setUnlockedLetters(prev => new Set([...prev, item.id]));
      }
    }
  };
  
  // Add new word list
  const addWordList = () => {
    if (newWordList.name && newWordList.words) {
      const words = newWordList.words.split(',').map(w => w.trim()).filter(w => w);
      const newList = {
        id: Date.now(),
        name: newWordList.name,
        words: words
      };
      setWordLists(prev => [...prev, newList]);
      setNewWordList({ name: '', words: '' });
    }
  };
  
  // Initialize game
  useEffect(() => {
    generateNewWord();
  }, [unlockedLetters, selectedWordList]);
  
  // Keyboard layout
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];
  
  const getKeyStyle = (key) => {
    const isUnlocked = unlockedLetters.has(key);
    const isHomeRow = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'].includes(key);
    
    let baseStyle = 'w-8 h-8 m-1 rounded text-sm font-medium transition-all duration-200 ';
    
    if (keyboardStyle === 'modern') {
      if (isUnlocked) {
        baseStyle += isHomeRow ? `${currentTheme.primary} text-white shadow-md` : `${currentTheme.secondary} ${currentTheme.accent} border ${currentTheme.border}`;
      } else {
        baseStyle += 'bg-gray-200 text-gray-400 border border-gray-300';
      }
    } else if (keyboardStyle === 'retro') {
      baseStyle += isUnlocked ? 'bg-yellow-200 text-yellow-800 border-2 border-yellow-400' : 'bg-gray-300 text-gray-500 border-2 border-gray-400';
    } else if (keyboardStyle === 'neon') {
      baseStyle += isUnlocked ? 'bg-black text-green-400 border border-green-400 shadow-lg shadow-green-400/50' : 'bg-gray-800 text-gray-600 border border-gray-600';
    } else if (keyboardStyle === 'minimal') {
      baseStyle += isUnlocked ? 'bg-white text-gray-800 border border-gray-300 shadow-sm' : 'bg-gray-100 text-gray-400 border border-gray-200';
    }
    
    return baseStyle;
  };

  return (
    <div className={`min-h-screen ${backgroundPatterns[backgroundPattern]} ${fontStyles[fontStyle]} transition-all duration-300`}>
      {/* Header */}
      <div className={`${currentTheme.primary} text-white p-4 shadow-lg`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Keyboard className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Typing Tutor Adventure</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">{coins} coins</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">Score: {score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Streak: {streak}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => { setShowStore(false); setShowWordManager(false); }}
            className={`px-4 py-2 rounded-lg transition-colors ${!showStore && !showWordManager ? currentTheme.primary + ' text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Play Game
          </button>
          <button
            onClick={() => { setShowStore(true); setShowWordManager(false); }}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${showStore ? currentTheme.primary + ' text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Store</span>
          </button>
          <button
            onClick={() => { setShowWordManager(true); setShowStore(false); }}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${showWordManager ? currentTheme.primary + ' text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <Plus className="w-4 h-4" />
            <span>Word Lists</span>
          </button>
        </div>

        {/* Game Screen */}
        {!showStore && !showWordManager && (
          <div className="space-y-6">
            {/* Game Area */}
            <div className={`${currentTheme.secondary} rounded-lg p-6 text-center`}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Word List:</label>
                <select
                  value={selectedWordList}
                  onChange={(e) => setSelectedWordList(parseInt(e.target.value))}
                  className="px-3 py-2 border rounded-lg"
                >
                  {wordLists.map(list => (
                    <option key={list.id} value={list.id}>{list.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Type this word:</h2>
                <div className={getWordDisplayStyle()}>
                  {currentWord}
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  className="text-2xl text-center px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type here..."
                  autoFocus
                />
              </div>
              
              <div className="flex justify-center space-x-6 text-sm">
                <span>Accuracy: {gameStats.total > 0 ? Math.round((gameStats.correct / gameStats.total) * 100) : 0}%</span>
                <span>Words Typed: {gameStats.correct}</span>
              </div>
            </div>

            {/* Virtual Keyboard */}
            <div className={`${currentTheme.secondary} rounded-lg p-6`}>
              <h3 className="text-lg font-semibold mb-4 text-center">Virtual Keyboard</h3>
              <div className="flex flex-col items-center space-y-2">
                {keyboardRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex">
                    {row.map(key => (
                      <button
                        key={key}
                        className={getKeyStyle(key)}
                        disabled={!unlockedLetters.has(key)}
                      >
                        {key.toUpperCase()}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                <span className={`inline-block w-4 h-4 rounded mr-2 ${currentTheme.primary}`}></span>
                Home Row
                <span className={`inline-block w-4 h-4 rounded mr-2 ml-4 ${currentTheme.secondary} border ${currentTheme.border}`}></span>
                Unlocked
                <span className="inline-block w-4 h-4 rounded mr-2 ml-4 bg-gray-200 border border-gray-300"></span>
                Locked
              </div>
            </div>
          </div>
        )}

        {/* Store */}
        {showStore && (
          <div className="space-y-6">
            <div className={`${currentTheme.secondary} rounded-lg p-6`}>
              <h2 className="text-2xl font-bold mb-4">Store</h2>
              <div className="flex items-center space-x-4 mb-6">
                <Star className="w-6 h-6 text-yellow-500" />
                <span className="text-xl font-semibold">Your Coins: {coins}</span>
              </div>
              
              {/* Store Categories */}
              <div className="space-y-8">
                {/* Letters */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">🔤 Letters</h3>
                  <div className="grid grid-cols-6 gap-3">
                    {storeItems.letters.map(item => (
                      <button
                        key={item.id}
                        onClick={() => purchaseItem(item)}
                        disabled={coins < item.price}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          coins >= item.price
                            ? `${currentTheme.secondary} ${currentTheme.border} hover:${currentTheme.primary} hover:text-white`
                            : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="text-xl font-bold">{item.name}</div>
                        <div className="text-sm">{item.price} coins</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Themes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">🎨 Themes</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {storeItems.themes.map(item => (
                      <button
                        key={item.id}
                        onClick={() => purchaseItem(item)}
                        disabled={coins < item.price}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          coins >= item.price
                            ? `${currentTheme.secondary} ${currentTheme.border} hover:${currentTheme.primary} hover:text-white`
                            : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm">{item.price} coins</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Keyboard Styles */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">⌨️ Keyboard Styles</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {storeItems.keyboards.map(item => (
                      <button
                        key={item.id}
                        onClick={() => purchaseItem(item)}
                        disabled={coins < item.price}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          coins >= item.price
                            ? `${currentTheme.secondary} ${currentTheme.border} hover:${currentTheme.primary} hover:text-white`
                            : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm">{item.price} coins</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Backgrounds */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">🎭 Backgrounds</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {storeItems.backgrounds.map(item => (
                      <button
                        key={item.id}
                        onClick={() => purchaseItem(item)}
                        disabled={coins < item.price}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          coins >= item.price
                            ? `${currentTheme.secondary} ${currentTheme.border} hover:${currentTheme.primary} hover:text-white`
                            : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm">{item.price} coins</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Panel */}
            <div className={`${currentTheme.secondary} rounded-lg p-6`}>
              <h3 className="text-lg font-semibold mb-4">🎨 Customize Your Experience</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Theme Color:</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {(Array.from(purchases.themes) as string[]).map(themeId => (
                      <option key={themeId} value={themeId}>
                        {themeId.charAt(0).toUpperCase() + themeId.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Keyboard Style:</label>
                  <select
                    value={keyboardStyle}
                    onChange={(e) => setKeyboardStyle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {(Array.from(purchases.keyboards) as string[]).map(kbId => (
                      <option key={kbId} value={kbId}>
                        {kbId.charAt(0).toUpperCase() + kbId.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Background:</label>
                  <select
                    value={backgroundPattern}
                    onChange={(e) => setBackgroundPattern(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {(Array.from(purchases.backgrounds) as string[]).map(bgId => (
                      <option key={bgId} value={bgId}>
                        {bgId.charAt(0).toUpperCase() + bgId.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Font Style:</label>
                  <select
                    value={fontStyle}
                    onChange={(e) => setFontStyle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {(Array.from(purchases.fonts) as string[]).map(fontId => (
                      <option key={fontId} value={fontId}>
                        {fontId.charAt(0).toUpperCase() + fontId.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Word Manager */}
        {showWordManager && (
          <div className="space-y-6">
            <div className={`${currentTheme.secondary} rounded-lg p-6`}>
              <h2 className="text-2xl font-bold mb-4">Word List Manager</h2>
              
              {/* Current Word Lists */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Current Word Lists</h3>
                <div className="space-y-2">
                  {wordLists.map(list => (
                    <div key={list.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <div className="font-semibold">{list.name}</div>
                        <div className="text-sm text-gray-600">{list.words.length} words</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {list.words.slice(0, 5).join(', ')}
                        {list.words.length > 5 && '...'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Word List */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Create New Word List</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">List Name:</label>
                    <input
                      type="text"
                      value={newWordList.name}
                      onChange={(e) => setNewWordList(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Enter list name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Words (comma-separated):</label>
                    <textarea
                      value={newWordList.words}
                      onChange={(e) => setNewWordList(prev => ({ ...prev, words: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg h-32"
                      placeholder="Enter words separated by commas..."
                    />
                  </div>
                  <button
                    onClick={addWordList}
                    disabled={!newWordList.name || !newWordList.words}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      newWordList.name && newWordList.words
                        ? `${currentTheme.primary} text-white hover:opacity-90`
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Add Word List
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTutorGame;