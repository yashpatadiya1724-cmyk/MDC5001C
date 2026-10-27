import { TopicLesson } from '../types';

export const UNIT1_TOPICS: TopicLesson[] = [
  {
    id: 'topic-1',
    number: 1,
    title: 'Introduction to Combinatorics & Its Applications',
    category: 'Counting Principles',
    shortSummary: 'Combinatorics is the branch of mathematics dealing with counting, arrangement, and configuration of discrete objects.',
    simpleDefinition: 'Combinatorics is the mathematics of counting and arranging things without having to list every single outcome one by one.',
    intuitiveExplanation: 'Imagine you have 10 books. Listing every order in which you could arrange them would take 3,628,800 lines! Combinatorics gives us algebraic tools to count possibilities, structure computer algorithms, optimize networks, design cryptography keys, and calculate probabilities instantly.',
    simpleLanguageExplanation: 'Instead of counting items one by one like 1, 2, 3... combinatorics gives us smart shortcuts and formulas to count large collections of possibilities quickly.',
    primaryFormula: {
      name: 'Combinatorial Counting Concept',
      latex: '\\text{Sample Space Size } |S| = \\sum_{i} |E_i| \\quad \\text{or} \\quad \\prod_{j} k_j',
      meaningOfSymbols: [
        { symbol: '|S|', meaning: 'Total cardinality (count of elements) of discrete set S' },
        { symbol: '\\Sigma', meaning: 'Summation applied when choices are mutually exclusive (Addition Rule)' },
        { symbol: '\\Pi', meaning: 'Product applied when choices are sequential independent stages (Product Rule)' }
      ],
      whenToUse: 'Use when analyzing real-world computational structures, algorithmic complexity, cryptography keyspaces, and probability samples.'
    },
    workedExample: {
      problem: 'A database administrator needs to create a 3-character security tag where the first character is an uppercase letter (A-Z) and the next two are digits (0-9). How many distinct security tags are possible?',
      stepByStep: [
        { step: 1, title: 'Identify stages of selection', detail: 'The task consists of 3 sequential choices: Choice 1 (letter), Choice 2 (digit), Choice 3 (digit).' },
        { step: 2, title: 'Count outcomes for each stage', detail: 'Uppercase letters A-Z: 26 possibilities. First digit (0-9): 10 possibilities. Second digit (0-9): 10 possibilities.', math: 'n_1 = 26, \\quad n_2 = 10, \\quad n_3 = 10' },
        { step: 3, title: 'Apply the Fundamental Principle of Counting', detail: 'Multiply the counts for all stages together.', math: 'N = 26 \\times 10 \\times 10 = 2,600' }
      ],
      finalAnswer: 'There are 2,600 distinct security tags possible.'
    },
    additionalPracticeExample: {
      problem: 'In an IT department, an employee code consists of 2 distinct vowels followed by 1 non-zero digit. How many codes can be formed?',
      solution: 'Vowels available: {A, E, I, O, U} (5 vowels). First vowel = 5 choices. Second distinct vowel = 4 choices. Non-zero digit (1-9) = 9 choices. Total = 5 * 4 * 9 = 180 codes.',
      math: '5 \\times 4 \\times 9 = 180'
    },
    commonMistakes: [
      'Confusing whether repetitions are allowed or disallowed in the problem statement.',
      'Adding possibilities when actions happen consecutively in sequence (should multiply).'
    ],
    examTips: [
      'In exams, explicitly identify: 1) What are the positions/stages? 2) How many choices exist per stage? 3) Does order matter?',
      'Always state the rule being used (Addition Rule vs Multiplication Rule).'
    ],
    practiceQuestions: [
      {
        id: 't1-q1',
        question: 'Which branch of discrete mathematics focuses on arrangement, enumeration, and existence of discrete structures?',
        options: ['Calculus', 'Combinatorics', 'Topology', 'Numerical Integration'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'Combinatorics is the discrete mathematical discipline dedicated to enumeration, combination, and permutation of sets of elements.',
        hint: 'It is the core title of this unit!'
      },
      {
        id: 't1-q2',
        question: 'A computer password requires 1 letter (from 26 English letters) followed by 1 digit (from 0 to 9). How many passwords can be created?',
        options: ['36', '260', '520', '676'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'By the multiplication principle: 26 choices * 10 choices = 260 total possible passwords.',
        hint: 'Multiply the number of letter choices by digit choices.'
      },
      {
        id: 't1-q3',
        question: 'True or False: If two events A and B are mutually exclusive (cannot happen together), we multiply their possibilities to find total ways.',
        options: ['True', 'False'],
        correctAnswer: '1',
        type: 'true-false',
        explanation: 'False. For mutually exclusive events where you do either A OR B, the Addition Rule applies (add possibilities).',
        hint: 'Think of "OR" vs "AND".'
      }
    ]
  },
  {
    id: 'topic-2',
    number: 2,
    title: 'Fundamental Counting Principle',
    category: 'Counting Principles',
    shortSummary: 'If a sequence of choices can be made in n1, n2, ..., nk ways, the entire sequence can be made in n1 * n2 * ... * nk ways.',
    simpleDefinition: 'The Fundamental Counting Principle states that if an experiment involves multi-step sequential tasks, you multiply the options at each step to get the grand total.',
    intuitiveExplanation: 'If you have 3 shirts and 4 trousers, for every single shirt you can pick any of the 4 trousers. That creates 3 groups of 4 combinations: 3 * 4 = 12 total outfits.',
    simpleLanguageExplanation: 'Whenever you have to make one choice AND THEN another choice AND THEN another choice, multiply the number of options at each step.',
    primaryFormula: {
      name: 'Multiplication Counting Principle',
      latex: 'N = n_1 \\times n_2 \\times n_3 \\times \\dots \\times n_k = \\prod_{i=1}^{k} n_i',
      meaningOfSymbols: [
        { symbol: 'N', meaning: 'Total number of compound configurations or outcomes' },
        { symbol: 'n_i', meaning: 'Number of available choices at stage i given the previous choices' },
        { symbol: 'k', meaning: 'Total number of sequential decision stages' }
      ],
      whenToUse: 'Use when a procedure consists of multiple sequential independent or dependent steps done one after another.'
    },
    workedExample: {
      problem: 'How many 4-digit PIN numbers can be formed using digits 0-9 if: (a) repetition of digits is permitted, (b) repetition is NOT permitted?',
      stepByStep: [
        { step: 1, title: 'Case (a): Repetition permitted', detail: 'Each of the 4 positions can take any digit from 0 to 9 (10 choices each).', math: 'N_{\\text{rep}} = 10 \\times 10 \\times 10 \\times 10 = 10^4 = 10,000' },
        { step: 2, title: 'Case (b): Repetition not permitted', detail: '1st digit has 10 choices, 2nd has 9, 3rd has 8, and 4th has 7.', math: 'N_{\\text{no-rep}} = 10 \\times 9 \\times 8 \\times 7 = 5,040' }
      ],
      finalAnswer: 'Case (a) yields 10,000 PINs. Case (b) yields 5,040 PINs.'
    },
    additionalPracticeExample: {
      problem: 'A menu offers 4 appetizers, 6 main courses, and 3 desserts. How many different 3-course dinners can a student select?',
      solution: 'Multiply the options: 4 * 6 * 3 = 72 different meal combinations.',
      math: '4 \\times 6 \\times 3 = 72'
    },
    commonMistakes: [
      'Assuming the first digit cannot be 0 in a PIN (in PINs, 0123 is valid; but in a 4-digit natural number, the thousands digit cannot be 0). Read the context carefully!'
    ],
    examTips: [
      'Distinguish between codes/PINs (where leading zero is allowed) and natural numbers (where leading zero is disallowed).'
    ],
    practiceQuestions: [
      {
        id: 't2-q1',
        question: 'How many 3-digit natural numbers can be formed using {1, 2, 3, 4, 5} if no repetition is allowed?',
        options: ['125', '60', '15', '20'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'Hundreds place: 5 choices. Tens place: 4 choices. Units place: 3 choices. Total = 5 * 4 * 3 = 60.',
        hint: 'First digit has 5 choices, next has 4, next has 3.'
      },
      {
        id: 't2-q2',
        question: 'Calculate the total number of binary strings of length 8 (1 byte).',
        options: ['16', '64', '256', '512'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: 'Each bit has 2 choices (0 or 1). For 8 bits: 2^8 = 256.',
        hint: '2 choices for each of the 8 bit positions.'
      },
      {
        id: 't2-q3',
        question: 'A coin is flipped 4 times. How many total outcomes are in the sample space?',
        options: ['8', '12', '16', '32'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: 'For each flip there are 2 outcomes (H or T). By product rule: 2 * 2 * 2 * 2 = 2^4 = 16.',
        hint: '2^4'
      }
    ]
  },
  {
    id: 'topic-3',
    number: 3,
    title: 'Addition Rule & Multiplication Rule',
    category: 'Counting Principles',
    shortSummary: 'Addition Rule applies to mutually exclusive OR choices; Multiplication Rule applies to sequential AND choices.',
    simpleDefinition: 'Use the Addition Rule when you must choose option A OR option B (disjoint choices). Use Multiplication Rule when you choose option A AND option B.',
    intuitiveExplanation: 'If you travel to university and can choose either a bus (3 routes) OR a train (2 routes), you have 3 + 2 = 5 ways. But if you take a bus to the station AND THEN take a train to campus, you have 3 * 2 = 6 ways.',
    simpleLanguageExplanation: 'Remember the keyword test: "OR" means ADD (+), "AND" means MULTIPLY (*).',
    primaryFormula: {
      name: 'Addition vs Multiplication Rules',
      latex: '\\text{Addition (Disjoint): } |A \\cup B| = |A| + |B| \\quad | \\quad \\text{Multiplication: } |A \\times B| = |A| \\times |B|',
      meaningOfSymbols: [
        { symbol: '|A \\cup B|', meaning: 'Size of union of two mutually exclusive sets (no common element)' },
        { symbol: '|A \\times B|', meaning: 'Size of Cartesian product formed by choosing an element from A AND an element from B' }
      ],
      whenToUse: 'Use Addition Rule for mutually exclusive alternatives (either/or). Use Multiplication Rule for joint sequential operations.'
    },
    workedExample: {
      problem: 'A college library allows a student to borrow either one mathematics book (from 15 distinct calculus and algebra titles) OR one computer science book (from 12 distinct programming titles). Alternatively, if a student is doing a dual project, they may borrow one of each. Find the total ways for both policies.',
      stepByStep: [
        { step: 1, title: 'Case 1: Either one math OR one CS book', detail: 'The choices are disjoint (mutually exclusive). Apply Addition Rule.', math: 'N_{\\text{or}} = 15 + 12 = 27' },
        { step: 2, title: 'Case 2: One math AND one CS book', detail: 'The choices are compounded. Apply Multiplication Rule.', math: 'N_{\\text{and}} = 15 \\times 12 = 180' }
      ],
      finalAnswer: 'Either math OR CS = 27 ways; One math AND one CS = 180 ways.'
    },
    additionalPracticeExample: {
      problem: 'A committee can be headed by choosing either a senior professor (from 5 available) or an associate professor (from 7 available). In how many ways can the chairperson be selected?',
      solution: 'Since a person cannot be both a senior and associate professor simultaneously in this pool, choices are disjoint: 5 + 7 = 12 ways.',
      math: '5 + 7 = 12'
    },
    commonMistakes: [
      'Applying the simple Addition Rule |A| + |B| when sets overlap (if they overlap, you must subtract the intersection, which is the Inclusion-Exclusion Principle).'
    ],
    examTips: [
      'Look for the words "either... or" (Addition Rule) versus "followed by", "and", "both" (Multiplication Rule).'
    ],
    practiceQuestions: [
      {
        id: 't3-q1',
        question: 'A student can choose a project from 3 lists: List A has 10 topics, List B has 8 topics, List C has 6 topics. No topic is on more than one list. How many choices are there to pick 1 topic?',
        options: ['24', '480', '18', '120'],
        correctAnswer: '0',
        type: 'mcq',
        explanation: 'Since the lists are mutually exclusive and the student picks 1 topic total: 10 + 8 + 6 = 24.',
        hint: 'Use the Addition Rule since you choose from List A OR B OR C.'
      },
      {
        id: 't3-q2',
        question: 'If you want to choose one topic from List A (10 topics) AND one from List B (8 topics), how many pairs can you form?',
        options: ['18', '80', '100', '800'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'Sequential/joint choice: 10 * 8 = 80 ways.',
        hint: 'Use the Multiplication Rule.'
      },
      {
        id: 't3-q3',
        question: 'True or False: If A and B share common elements, |A U B| is strictly greater than |A| + |B|.',
        options: ['True', 'False'],
        correctAnswer: '1',
        type: 'true-false',
        explanation: 'False. If they share elements, |A U B| = |A| + |B| - |A n B|, which is strictly LESS than |A| + |B|.',
        hint: 'Shared elements get double-counted.'
      }
    ]
  },
  {
    id: 'topic-4',
    number: 4,
    title: 'Permutations — Order Matters',
    category: 'Permutations & Combinations',
    shortSummary: 'A permutation is an ordered arrangement of distinct objects. P(n,r) = n! / (n - r)!',
    simpleDefinition: 'A permutation is an arrangement of items where ORDER MATTERS. Changing the sequence changes the outcome.',
    intuitiveExplanation: 'Think of 1st, 2nd, and 3rd place medals in a race. If Alice wins Gold and Bob wins Silver, that is completely different from Bob winning Gold and Alice winning Silver! That is a permutation.',
    simpleLanguageExplanation: 'Whenever position, rank, order, or sequence matters (like gold/silver/bronze or president/vice-president), you need a Permutation.',
    primaryFormula: {
      name: 'Permutations of n Distinct Objects Taken r at a Time',
      latex: 'P(n,r) = {}^n P_r = \\frac{n!}{(n-r)!} = n(n-1)(n-2)\\cdots(n-r+1)',
      meaningOfSymbols: [
        { symbol: 'n', meaning: 'Total number of distinct items available in the pool' },
        { symbol: 'r', meaning: 'Number of items to be selected and arranged in order (0 <= r <= n)' },
        { symbol: 'n!', meaning: 'Factorial of n: n * (n-1) * (n-2) * ... * 1, with 0! = 1' }
      ],
      whenToUse: 'Use when selecting r items from n distinct items where the order of selection or placement creates a distinct outcome.'
    },
    workedExample: {
      problem: 'In a class of 20 computer science students, in how many ways can a President, Vice-President, and Secretary be elected?',
      stepByStep: [
        { step: 1, title: 'Analyze order condition', detail: 'The 3 posts are distinct offices. Order matters, so this is a permutation problem with n = 20 and r = 3.' },
        { step: 2, title: 'Apply P(n,r) formula', detail: 'Evaluate P(20, 3) = 20! / (20 - 3)! = 20! / 17!', math: 'P(20,3) = \\frac{20!}{17!} = 20 \\times 19 \\times 18' },
        { step: 3, title: 'Compute the product', detail: '20 * 19 = 380, and 380 * 18 = 6,840.', math: 'P(20,3) = 6,840' }
      ],
      finalAnswer: 'There are 6,840 distinct ways to elect the 3 officers.'
    },
    additionalPracticeExample: {
      problem: 'Find the number of 4-letter words (with or without meaning) that can be formed from the letters of MATHS without repetition.',
      solution: 'MATHS has 5 distinct letters. We pick and arrange 4 letters: P(5,4) = 5! / (5-4)! = 120 / 1 = 120.',
      math: 'P(5,4) = \\frac{5!}{1!} = 120'
    },
    commonMistakes: [
      'Confusing P(n,r) with C(n,r). Always check: does changing the order create a new outcome?',
      'Forgetting that 0! = 1 by mathematical definition.'
    ],
    examTips: [
      'P(n, n) = n! (arranging all n items in a row).',
      'P(n, 1) = n, and P(n, 0) = 1.'
    ],
    practiceQuestions: [
      {
        id: 't4-q1',
        question: 'Calculate P(6, 2).',
        options: ['15', '30', '36', '12'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'P(6,2) = 6! / (6 - 2)! = 6 * 5 = 30.',
        hint: '6 * 5'
      },
      {
        id: 't4-q2',
        question: 'How many ways can 5 runners finish in 1st, 2nd, and 3rd place?',
        options: ['10', '60', '120', '20'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'P(5, 3) = 5 * 4 * 3 = 60 ways.',
        hint: 'P(5,3)'
      },
      {
        id: 't4-q3',
        question: 'What is the value of 0! ?',
        options: ['0', '1', 'Undefined', '-1'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'By standard convention and the gamma function definition, 0! = 1.',
        hint: 'Empty product equals multiplicative identity.'
      }
    ]
  },
  {
    id: 'topic-5',
    number: 5,
    title: 'Permutations with Repetition',
    category: 'Permutations & Combinations',
    shortSummary: 'When items can be reused across r positions, total arrangements = n^r.',
    simpleDefinition: 'When you arrange r items from n choices and the same item can be picked more than once, each position has n independent choices.',
    intuitiveExplanation: 'Consider a 3-wheel combination lock where each dial has digits 0 through 9. You can use 7-7-7 if you want. Since each wheel independently has 10 choices, the total combinations are 10 * 10 * 10 = 10^3 = 1,000.',
    simpleLanguageExplanation: 'If you are allowed to reuse letters or numbers as many times as you like, you simply multiply n by itself r times (n^r).',
    primaryFormula: {
      name: 'Permutation with Repetition Allowed',
      latex: 'N = n^r',
      meaningOfSymbols: [
        { symbol: 'n', meaning: 'Number of types or distinct symbols available for each slot' },
        { symbol: 'r', meaning: 'Number of positions/slots to fill in the sequence' }
      ],
      whenToUse: 'Use when forming strings, passwords, numbers, or sequences where any element may be reused without restriction.'
    },
    workedExample: {
      problem: 'An IoT wireless sensor transmits a 6-bit packet where each bit is either 0 or 1. How many distinct packets can be generated?',
      stepByStep: [
        { step: 1, title: 'Identify choices per slot', detail: 'Each bit position has n = 2 possible values (0 or 1).' },
        { step: 2, title: 'Identify length of sequence', detail: 'The sequence has r = 6 positions.' },
        { step: 3, title: 'Calculate n^r', detail: '2^6 = 64 distinct packets.', math: 'N = 2^6 = 64' }
      ],
      finalAnswer: 'There are 64 distinct 6-bit packets.'
    },
    additionalPracticeExample: {
      problem: 'In a multiple-choice quiz with 5 questions, each question has 4 options (A, B, C, D). In how many ways can a student answer the test?',
      solution: 'Each question has 4 choices. For 5 questions: 4^5 = 1,024 ways.',
      math: '4^5 = 1024'
    },
    commonMistakes: [
      'Inverting n and r (calculating r^n instead of n^r). Always ask: How many choices per slot? (n) Raised to how many slots? (r).'
    ],
    examTips: [
      'Compare: Without repetition P(n, r) = n! / (n-r)!; With repetition = n^r. The repetition count is always greater or equal.'
    ],
    practiceQuestions: [
      {
        id: 't5-q1',
        question: 'How many 4-letter strings can be made from {A, B, C} if repetition of letters is allowed?',
        options: ['12', '64', '81', '24'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: 'n = 3 letters, r = 4 slots: 3^4 = 81.',
        hint: '3 * 3 * 3 * 3'
      },
      {
        id: 't5-q2',
        question: 'A lock has 4 dials, each containing digits 0 through 9. How many possible combinations exist?',
        options: ['36', '5040', '10000', '6561'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: '10^4 = 10,000 combinations.',
        hint: '10 to the 4th power.'
      },
      {
        id: 't5-q3',
        question: 'True or False: The number of permutations of n distinct objects taken r at a time with repetition allowed is always n^r.',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. Each of the r positions has n independent possibilities, yielding n * n * ... * n = n^r.',
        hint: 'Fundamental product rule with independent identical stages.'
      }
    ]
  },
  {
    id: 'topic-6',
    number: 6,
    title: 'Combinations — Order Does Not Matter',
    category: 'Permutations & Combinations',
    shortSummary: 'A combination is an un-ordered selection of items from a set. C(n,r) = n! / [r!(n - r)!].',
    simpleDefinition: 'A combination is a group or team chosen from a set where ORDER DOES NOT MATTER.',
    intuitiveExplanation: 'If you choose a pizza with mushrooms and olives, it is the exact same pizza whether you put the mushrooms on first or the olives on first! Since order does not matter, you divide out the r! arrangements.',
    simpleLanguageExplanation: 'Choosing a group, committee, hand of playing cards, or pizza toppings is a combination because the order of choosing does not change who is in the group.',
    primaryFormula: {
      name: 'Combinations of n Distinct Objects Taken r at a Time',
      latex: 'C(n,r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!} = \\frac{P(n,r)}{r!}',
      meaningOfSymbols: [
        { symbol: 'n', meaning: 'Total number of items in the population' },
        { symbol: 'r', meaning: 'Number of items to select into the subset' },
        { symbol: 'r!', meaning: 'Dividing factor that eliminates order within the chosen subset of size r' }
      ],
      whenToUse: 'Use when selecting subsets, committees, delegations, lottery numbers, or combinations where sequence has no significance.'
    },
    workedExample: {
      problem: 'From a software engineering team of 10 developers, a project lead must choose a 4-member agile sprint taskforce. How many different taskforces can be formed?',
      stepByStep: [
        { step: 1, title: 'Determine if order matters', detail: 'The 4 developers serve equally on the sprint taskforce. No titles or ranks exist, so order does not matter: use C(n,r).' },
        { step: 2, title: 'Set up formula', detail: 'n = 10, r = 4. C(10, 4) = 10! / [4! * (10 - 4)!] = 10! / (4! * 6!)', math: 'C(10,4) = \\frac{10 \\times 9 \\times 8 \\times 7}{4 \\times 3 \\times 2 \\times 1}' },
        { step: 3, title: 'Simplify the fraction', detail: '4 * 2 = 8 cancels 8. 9 / 3 = 3. Remaining: 10 * 3 * 7 = 210.', math: 'C(10,4) = 210' }
      ],
      finalAnswer: 'There are 210 different taskforces possible.'
    },
    additionalPracticeExample: {
      problem: 'A standard deck has 52 cards. How many different 5-card poker hands can be dealt?',
      solution: 'Order of dealing cards into a hand does not matter: C(52, 5) = 52! / (5! * 47!) = 2,598,960.',
      math: 'C(52,5) = \\frac{52 \\times 51 \\times 50 \\times 49 \\times 48}{120} = 2,598,960'
    },
    commonMistakes: [
      'Using permutations P(n,r) when picking a committee without designated titles.',
      'Forgetting that C(n, r) is always an integer; if your fraction does not divide evenly, re-check your factorial arithmetic!'
    ],
    examTips: [
      'Symmetry identity: C(n, r) = C(n, n - r). Computing C(100, 98) is just C(100, 2) = (100 * 99) / 2 = 4,950!'
    ],
    practiceQuestions: [
      {
        id: 't6-q1',
        question: 'Compute C(8, 3).',
        options: ['24', '56', '336', '64'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'C(8,3) = (8 * 7 * 6) / (3 * 2 * 1) = 56.',
        hint: '(8 * 7 * 6) / 6'
      },
      {
        id: 't6-q2',
        question: 'In how many ways can 2 students be selected from a class of 15 to represent the class?',
        options: ['210', '105', '30', '120'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'C(15, 2) = (15 * 14) / 2 = 105.',
        hint: '15 * 14 / 2'
      },
      {
        id: 't6-q3',
        question: 'True or False: C(n, 0) = 1 and C(n, n) = 1 for any non-negative integer n.',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. There is exactly 1 way to choose nothing (the empty set) and 1 way to choose all elements.',
        hint: 'n! / (0! * n!) = 1'
      }
    ]
  },
  {
    id: 'topic-7',
    number: 7,
    title: 'Key Identities & Relationships',
    category: 'Permutations & Combinations',
    shortSummary: 'Fundamental algebraic identities connecting P(n,r), C(n,r), Pascal Identity, and Symmetry.',
    simpleDefinition: 'Key identities are mathematical truths that connect permutations and combinations together and allow fast computations.',
    intuitiveExplanation: 'Choosing 2 people to leave out of 10 is mathematically the same as choosing 8 people to stay in: C(10, 2) = C(10, 8). Also, picking a team and then ranking them gives the permutation formula: P(n,r) = C(n,r) * r!.',
    simpleLanguageExplanation: 'These equations are mathematical shortcuts that let you solve exam questions without doing long, messy calculations.',
    primaryFormula: {
      name: 'Essential Combinatorial Identities',
      latex: 'P(n,r) = r! \\cdot C(n,r), \\quad C(n,r) = C(n, n-r), \\quad C(n,r) = C(n-1, r-1) + C(n-1, r)',
      meaningOfSymbols: [
        { symbol: 'C(n,r) = C(n, n-r)', meaning: 'Symmetry property (choosing r is equivalent to rejecting n - r)' },
        { symbol: 'C(n-1, r-1) + C(n-1, r)', meaning: 'Pascal\'s Identity (splitting outcomes based on whether a specific item is included or excluded)' },
        { symbol: 'P(n,r) = r! \\cdot C(n,r)', meaning: 'Bridge relationship: an ordered arrangement equals selecting a subset then arranging it in r! ways' }
      ],
      whenToUse: 'Use to simplify complex algebraic proofs, verify calculations, and construct Pascal\'s triangle rows.'
    },
    workedExample: {
      problem: 'Prove algebraically using factorials that C(n, r) = C(n, n - r).',
      stepByStep: [
        { step: 1, title: 'Write LHS formula', detail: 'By definition of combinations:', math: 'C(n,r) = \\frac{n!}{r!(n-r)!}' },
        { step: 2, title: 'Write RHS formula', detail: 'Substitute (n - r) in place of r in the combination formula:', math: 'C(n, n-r) = \\frac{n!}{(n-r)!(n - (n-r))!} = \\frac{n!}{(n-r)!r!}' },
        { step: 3, title: 'Compare denominators', detail: 'Since multiplication of integers is commutative, r!(n - r)! = (n - r)!r!. Therefore, LHS = RHS.', math: '\\frac{n!}{r!(n-r)!} = \\frac{n!}{(n-r)!r!}' }
      ],
      finalAnswer: 'The identity C(n, r) = C(n, n - r) is proved.'
    },
    additionalPracticeExample: {
      problem: 'Using Pascal\'s identity, express C(10, 4) in terms of combinations of 9 items.',
      solution: 'By Pascal\'s identity C(n, r) = C(n-1, r-1) + C(n-1, r), here n = 10 and r = 4. Thus C(10, 4) = C(9, 3) + C(9, 4).',
      math: 'C(10,4) = C(9,3) + C(9,4)'
    },
    commonMistakes: [
      'Applying Pascal\'s Identity with mismatched indices. Notice that the top number decreases by 1 in BOTH terms, but the bottom numbers are (r-1) and r.'
    ],
    examTips: [
      'Always remember: sum of all combinations in row n is 2^n: C(n,0) + C(n,1) + ... + C(n,n) = 2^n.'
    ],
    practiceQuestions: [
      {
        id: 't7-q1',
        question: 'If C(n, 8) = C(n, 12), find the value of n.',
        options: ['16', '20', '96', '4'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'By the symmetry identity C(n, r) = C(n, n-r), if C(n, a) = C(n, b) with a != b, then a + b = n. Thus n = 8 + 12 = 20.',
        hint: 'Use n = r1 + r2.'
      },
      {
        id: 't7-q2',
        question: 'Given P(n, 3) = 60 and C(n, 3) = 10, what factor relates them?',
        options: ['2', '3', '6', '12'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: 'P(n,r) = r! * C(n,r). Here r = 3, and 3! = 6. 60 = 6 * 10.',
        hint: 'r! for r=3 is 6.'
      },
      {
        id: 't7-q3',
        question: 'Which identity states C(n, r) = C(n-1, r-1) + C(n-1, r)?',
        options: ['Vandermonde\'s Theorem', 'Pascal\'s Identity', 'Newton\'s Identity', 'Euler\'s Formula'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'Pascal\'s Identity is the mathematical recurrence that generates Pascal\'s triangle.',
        hint: 'Named after Blaise Pascal.'
      }
    ]
  },
  {
    id: 'topic-8',
    number: 8,
    title: 'Applications of Counting Principles',
    category: 'Counting Principles',
    shortSummary: 'Real-world problem solving: Grid walking paths, committee formation with constraints, and password spaces.',
    simpleDefinition: 'Applications of counting principles apply permutations, combinations, and addition/multiplication rules to real-world engineering and computer science constraints.',
    intuitiveExplanation: 'If you want to walk from top-left (0,0) to bottom-right (m,n) on a city grid by only moving Right and Down, every valid path has exactly m Right steps and n Down steps. The total paths is simply choosing which steps are Right: C(m+n, m)!',
    simpleLanguageExplanation: 'When real problems have rules like "at least one woman must be on the committee" or "letters cannot appear consecutively", we use subtraction tricks and case analysis to solve them.',
    primaryFormula: {
      name: 'Grid Walking Paths & Complementary Counting',
      latex: '\\text{Grid paths: } \\binom{m+n}{m} = \\frac{(m+n)!}{m! n!}, \\quad |A| = |\\text{Total}| - |A^c|',
      meaningOfSymbols: [
        { symbol: 'm, n', meaning: 'Number of horizontal and vertical steps in grid navigation' },
        { symbol: '|A^c|', meaning: 'Complementary count: calculating the opposite ("bad") cases and subtracting from total' }
      ],
      whenToUse: 'Use complementary counting whenever you see "at least one", and use grid path combinations for network routing.'
    },
    workedExample: {
      problem: 'A committee of 5 is to be formed from 6 men and 4 women. In how many ways can this committee be formed if it must contain at least one woman?',
      stepByStep: [
        { step: 1, title: 'Find unrestricted total choices', detail: 'Total available people = 6 + 4 = 10. Total ways to pick any 5 people:', math: 'N_{\\text{total}} = C(10,5) = \\frac{10 \\times 9 \\times 8 \\times 7 \\times 6}{5 \\times 4 \\times 3 \\times 2 \\times 1} = 252' },
        { step: 2, title: 'Count the forbidden (complementary) case', detail: 'The forbidden case is zero women (all 5 members are men chosen from the 6 men).', math: 'N_{\\text{no women}} = C(6,5) = 6' },
        { step: 3, title: 'Subtract forbidden from total', detail: 'At least 1 woman = Total - Zero women.', math: 'N_{\\ge 1 \\text{ woman}} = 252 - 6 = 246' }
      ],
      finalAnswer: 'There are 246 valid committees with at least one woman.'
    },
    additionalPracticeExample: {
      problem: 'How many shortest paths exist from coordinate (0,0) to (4,3) moving only right (+x) or up (+y)?',
      solution: 'Total steps = 4 + 3 = 7 steps. Number of ways to choose which 4 steps are right: C(7,4) = 7! / (4! * 3!) = 35 paths.',
      math: 'C(7,4) = \\frac{7 \\times 6 \\times 5}{6} = 35'
    },
    commonMistakes: [
      'Trying to count "at least 1" directly by picking 1 woman first and then 4 people from the rest. That causes massive over-counting! Always use complementary counting: Total - None.'
    ],
    examTips: [
      'When an exam question says "at least one", immediately think: Total - (None).'
    ],
    practiceQuestions: [
      {
        id: 't8-q1',
        question: 'How many shortest paths exist on a grid from (0,0) to (3,2)?',
        options: ['10', '12', '15', '20'],
        correctAnswer: '0',
        type: 'mcq',
        explanation: 'Total steps = 3 + 2 = 5 steps. Choose 2 up steps: C(5,2) = (5 * 4) / 2 = 10.',
        hint: 'C(5,2)'
      },
      {
        id: 't8-q2',
        question: 'In how many ways can 4 boys and 3 girls sit in a row such that all 3 girls always sit together?',
        options: ['144', '720', '5040', '120'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'Treat the 3 girls as 1 block. Total units to arrange: 4 boys + 1 block = 5 units (5! ways). Inside the block, the 3 girls can arrange in 3! ways. Total = 5! * 3! = 120 * 6 = 720.',
        hint: 'Use the block method: 5! * 3!'
      },
      {
        id: 't8-q3',
        question: 'True or False: Complementary counting computes the total unrestricted ways and subtracts the invalid ways.',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. Valid = Total - Invalid. This is often vastly simpler than summing many separate cases.',
        hint: 'Total minus complement equals target count.'
      }
    ]
  },
  {
    id: 'topic-9',
    number: 9,
    title: 'Pigeonhole Principle',
    category: 'Theorems & Principles',
    shortSummary: 'If k+1 or more pigeons are placed in k pigeonholes, at least one hole must contain >= 2 pigeons.',
    simpleDefinition: 'The Pigeonhole Principle states that if you have more items than containers, at least one container must hold more than one item.',
    intuitiveExplanation: 'If you have 13 people in a room, since there are only 12 months in a year, at least two people MUST share the same birth month! You do not need to know their birthdays to be 100% mathematically sure of this.',
    simpleLanguageExplanation: 'If you put 4 socks into 3 drawers, at least one drawer has to have 2 or more socks inside.',
    primaryFormula: {
      name: 'Pigeonhole Principle (Basic & Generalized)',
      latex: '\\text{Basic: If } N > k, \\; \\exists \\text{ box with } \\ge 2 \\text{ items.} \\quad \\text{Generalized: } \\left\\lceil \\frac{N}{k} \\right\\rceil',
      meaningOfSymbols: [
        { symbol: 'N', meaning: 'Total number of items (pigeons)' },
        { symbol: 'k', meaning: 'Total number of categories/containers (pigeonholes)' },
        { symbol: '\\lceil N/k \\rceil', meaning: 'Ceiling function: smallest integer greater than or equal to N/k' }
      ],
      whenToUse: 'Use to guarantee collisions, duplicate data, hash table collisions, birthday duplicates, and lossless compression limits.'
    },
    workedExample: {
      problem: 'What is the minimum number of students needed in an MCA class to guarantee that at least 5 students receive the exact same letter grade, if grades are {A, B, C, D, F}?',
      stepByStep: [
        { step: 1, title: 'Identify pigeonholes (k)', detail: 'Possible letter grades = {A, B, C, D, F}, so k = 5 categories.' },
        { step: 2, title: 'Apply worst-case pigeonhole condition', detail: 'To guarantee at least 5 students get the same grade, in the worst case each grade could be assigned to 4 students without reaching 5.', math: 'k \\times (d - 1) = 5 \\times 4 = 20 \\text{ students}' },
        { step: 3, title: 'Add 1 more student', detail: 'The 21st student must fall into one of the 5 grades, forcing that grade to have 5 students.', math: 'N = k(m - 1) + 1 = 5(5 - 1) + 1 = 21' }
      ],
      finalAnswer: 'A minimum of 21 students is required.'
    },
    additionalPracticeExample: {
      problem: 'A dark room has 10 black socks and 10 white socks. What is the minimum number of socks you must pull out in the dark to guarantee at least one matching pair?',
      solution: 'Colors (pigeonholes) k = 2 (black, white). By Pigeonhole Principle, pulling k + 1 = 2 + 1 = 3 socks guarantees at least 2 of the same color.',
      math: 'k + 1 = 2 + 1 = 3'
    },
    commonMistakes: [
      'Using floor instead of ceiling. The maximum occupancy guaranteed is ceil(N/k).',
      'Confusing which is the pigeon and which is the pigeonhole.'
    ],
    examTips: [
      'To guarantee m items in a box with k boxes: Minimum N = k * (m - 1) + 1.'
    ],
    practiceQuestions: [
      {
        id: 't9-q1',
        question: 'How many people must be in a room to guarantee that at least 2 were born on the same day of the week?',
        options: ['7', '8', '14', '15'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'There are k = 7 days in a week. By the basic pigeonhole principle, 7 + 1 = 8 people guarantees a duplicate day.',
        hint: 'Number of days in a week + 1.'
      },
      {
        id: 't9-q2',
        question: 'If 47 cards are distributed into 5 boxes, what is the guaranteed minimum number of cards in the fullest box?',
        options: ['8', '9', '10', '11'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: 'Ceiling of N/k = ceil(47 / 5) = ceil(9.4) = 10 cards.',
        hint: 'Ceiling of 47/5.'
      },
      {
        id: 't9-q3',
        question: 'True or False: The Pigeonhole Principle can prove that a collision occurs in hash functions when input space is larger than hash table size.',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. In computer science, this proves hash collisions are mathematically inevitable when inputs exceed table slots.',
        hint: 'More keys than slots guarantees collisions.'
      }
    ]
  },
  {
    id: 'topic-10',
    number: 10,
    title: "Pascal's Triangle",
    category: 'Theorems & Principles',
    shortSummary: 'A triangular array where each entry is the sum of the two numbers directly above it: C(n,k) = C(n-1, k-1) + C(n-1, k).',
    simpleDefinition: 'Pascal\'s Triangle is a geometric arrangement of numbers where row n contains the combination values C(n, 0), C(n, 1), ..., C(n, n).',
    intuitiveExplanation: 'Row 0 is 1. Row 1 is 1 1. Row 2 is 1 2 1. Notice that 2 = 1 + 1. Row 3 is 1 3 3 1 (3 = 1 + 2). Every inside number is simply the sum of its two upper neighbors. It gives the exact coefficients of binomial expansions!',
    simpleLanguageExplanation: 'A number pyramid where you start with 1 at the top, and every number below is made by adding the two numbers directly above it.',
    primaryFormula: {
      name: "Pascal's Triangle Generation & Row Sums",
      latex: '\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}, \\quad \\sum_{k=0}^{n} \\binom{n}{k} = 2^n',
      meaningOfSymbols: [
        { symbol: 'n', meaning: 'Row index (0-indexed: top row is row 0)' },
        { symbol: 'k', meaning: 'Column index across row n (from 0 to n)' },
        { symbol: '2^n', meaning: 'The total sum of all numbers in row n' }
      ],
      whenToUse: 'Use to quickly find binomial coefficients without computing factorials, and to evaluate combinatorial sums.'
    },
    workedExample: {
      problem: 'Construct row 4 of Pascal\'s triangle from row 3, and verify that its row sum equals 2^4 = 16.',
      stepByStep: [
        { step: 1, title: 'Write down row 3', detail: 'Row 3 has entries: 1, 3, 3, 1.' },
        { step: 2, title: 'Compute row 4 entries', detail: 'Edges are 1. Interior: 1 + 3 = 4, 3 + 3 = 6, 3 + 1 = 4. Edges = 1.', math: '\\text{Row 4: } [1, \\; 4, \\; 6, \\; 4, \\; 1]' },
        { step: 3, title: 'Sum the row entries', detail: '1 + 4 + 6 + 4 + 1 = 16, which matches 2^4 = 16.', math: '1 + 4 + 6 + 4 + 1 = 16 = 2^4' }
      ],
      finalAnswer: 'Row 4 is: 1, 4, 6, 4, 1. Its sum is 16 = 2^4.'
    },
    additionalPracticeExample: {
      problem: 'Find the entry in row 6, column 2 of Pascal\'s triangle (i.e. C(6, 2)).',
      solution: 'C(6, 2) = (6 * 5) / (2 * 1) = 15.',
      math: '\\binom{6}{2} = 15'
    },
    commonMistakes: [
      'Forgetting that Pascal\'s triangle starts with Row 0 at the very top (just the single 1). The row with [1, 2, 1] is Row 2.'
    ],
    examTips: [
      'Row n always has n + 1 entries.',
      'Pascal\'s triangle is symmetric: the kth number from the left equals the kth number from the right.'
    ],
    practiceQuestions: [
      {
        id: 't10-q1',
        question: 'What is the sum of all elements in Row 5 of Pascal\'s triangle?',
        options: ['16', '25', '32', '64'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: 'The sum of row n is 2^n. For n = 5: 2^5 = 32.',
        hint: '2^5'
      },
      {
        id: 't10-q2',
        question: 'What is the middle element of Row 4 of Pascal\'s triangle [1, 4, x, 4, 1]?',
        options: ['4', '5', '6', '8'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: 'C(4, 2) = (4 * 3) / 2 = 6.',
        hint: '3 + 3'
      },
      {
        id: 't10-q3',
        question: 'True or False: Every row in Pascal\'s triangle begins and ends with the number 1.',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. C(n, 0) = 1 and C(n, n) = 1 for all rows.',
        hint: 'Check the boundary values.'
      }
    ]
  },
  {
    id: 'topic-11',
    number: 11,
    title: 'Binomial Theorem',
    category: 'Theorems & Principles',
    shortSummary: 'Expansion of (x+y)^n into a sum of terms involving binomial coefficients: sum of C(n,k) * x^(n-k) * y^k.',
    simpleDefinition: 'The Binomial Theorem gives a formula for expanding any power of a binomial expression (x + y)^n into a polynomial.',
    intuitiveExplanation: 'Instead of multiplying (x + y) by itself 5 times by hand, the Binomial Theorem tells us that every term has the form x^(5-k) y^k, and the coefficient is simply the combination C(5, k) from Pascal\'s triangle!',
    simpleLanguageExplanation: 'A reliable formula that expands expressions like (a + b)^4 without doing endless FOIL brackets.',
    primaryFormula: {
      name: 'Binomial Theorem & General Term',
      latex: '(x+y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k, \\quad T_{r+1} = \\binom{n}{r} x^{n-r} y^r',
      meaningOfSymbols: [
        { symbol: 'n', meaning: 'Non-negative integer power of the binomial' },
        { symbol: 'k', meaning: 'Index of summation running from 0 to n' },
        { symbol: 'T_{r+1}', meaning: 'The (r+1)-th term in the expansion (where r runs 0, 1, 2, ...)' }
      ],
      whenToUse: 'Use to expand algebraic binomials, find specific coefficients, or determine constant (independent of x) terms.'
    },
    workedExample: {
      problem: 'Find the coefficient of x^3 in the expansion of (1 - 2x)^5.',
      stepByStep: [
        { step: 1, title: 'State general term formula', detail: 'In (a + b)^n with a = 1, b = -2x, n = 5:', math: 'T_{r+1} = \\binom{5}{r} (1)^{5-r} (-2x)^r = \\binom{5}{r} (-2)^r x^r' },
        { step: 2, title: 'Set exponent of x equal to 3', detail: 'We want x^3, so r = 3.' },
        { step: 3, title: 'Calculate coefficient', detail: 'Evaluate C(5, 3) * (-2)^3 = 10 * (-8) = -80.', math: 'T_4 = \\binom{5}{3} (-2)^3 x^3 = 10 \\times (-8) x^3 = -80 x^3' }
      ],
      finalAnswer: 'The coefficient of x^3 is -80.'
    },
    additionalPracticeExample: {
      problem: 'Expand (x + 2)^3 completely using the Binomial Theorem.',
      solution: 'C(3,0)x^3 + C(3,1)x^2(2) + C(3,2)x(2^2) + C(3,3)(2^3) = 1*x^3 + 3*2*x^2 + 3*4*x + 1*8 = x^3 + 6x^2 + 12x + 8.',
      math: '(x+2)^3 = x^3 + 6x^2 + 12x + 8'
    },
    commonMistakes: [
      'Forgetting the negative sign when expanding (a - b)^n. For example, (-2x)^3 = -8x^3, not +8x^3.',
      'Remember that the (r+1)-th term corresponds to r in C(n, r).'
    ],
    examTips: [
      'Number of terms in (x + y)^n is always n + 1.',
      'If asked for the term independent of x, set the net exponent of x to 0 and solve for r.'
    ],
    practiceQuestions: [
      {
        id: 't11-q1',
        question: 'How many terms are there in the expansion of (2x + 3y)^7?',
        options: ['7', '8', '14', '21'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'The expansion of (x + y)^n always contains n + 1 terms. For n = 7, there are 7 + 1 = 8 terms.',
        hint: 'n + 1'
      },
      {
        id: 't11-q2',
        question: 'What is the coefficient of x^2 in the expansion of (x + 1)^4?',
        options: ['4', '6', '12', '1'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'C(4, 2) = (4 * 3) / 2 = 6.',
        hint: 'C(4,2)'
      },
      {
        id: 't11-q3',
        question: 'True or False: In (x - y)^4, all terms have positive coefficients.',
        options: ['True', 'False'],
        correctAnswer: '1',
        type: 'true-false',
        explanation: 'False. The signs alternate (+, -, +, -, +) because (-y)^k is negative when k is odd.',
        hint: 'Odd powers of negative numbers remain negative.'
      }
    ]
  },
  {
    id: 'topic-12',
    number: 12,
    title: 'Inclusion-Exclusion Principle (2 & 3 Sets)',
    category: 'Theorems & Principles',
    shortSummary: 'Formula for counting elements in unions of overlapping sets by adding sizes and alternatingly subtracting intersections.',
    simpleDefinition: 'The Inclusion-Exclusion Principle prevents double-counting by subtracting elements that belong to multiple sets.',
    intuitiveExplanation: 'If 30 students like Java and 25 like Python, you cannot simply say 55 students like programming because 10 students might know BOTH. You must subtract the 10 double-counted students: 30 + 25 - 10 = 45.',
    simpleLanguageExplanation: 'Add the individual groups, subtract the two-group overlaps, and add back the three-group overlap.',
    primaryFormula: {
      name: 'Inclusion-Exclusion Principle (2 and 3 Sets)',
      latex: '|A \\cup B| = |A| + |B| - |A \\cap B|, \\quad |A \\cup B \\cup C| = \\sum |A| - \\sum |A \\cap B| + |A \\cap B \\cap C|',
      meaningOfSymbols: [
        { symbol: '|A \\cup B|', meaning: 'Count of elements in either set A or set B or both' },
        { symbol: '|A \\cap B|', meaning: 'Intersection: count of elements belonging to both A and B simultaneously' },
        { symbol: '|A \\cap B \\cap C|', meaning: 'Triple intersection: elements belonging to all three sets' }
      ],
      whenToUse: 'Use whenever counting survey results, students studying multiple languages, or divisibility by multiple numbers.'
    },
    workedExample: {
      problem: 'In a class of 100 IT students: 50 know Python, 40 know Java, 30 know C++, 15 know Python & Java, 10 know Java & C++, 12 know Python & C++, and 5 know all three languages. How many students know at least one of these languages?',
      stepByStep: [
        { step: 1, title: 'Sum individual set cardinalities', detail: '|P| + |J| + |C| = 50 + 40 + 30 = 120' },
        { step: 2, title: 'Subtract pairwise intersections', detail: '-(15 + 10 + 12) = -37' },
        { step: 3, title: 'Add back triple intersection', detail: '+|P ∩ J ∩ C| = +5' },
        { step: 4, title: 'Calculate final union', detail: '|P ∪ J ∪ C| = 120 - 37 + 5 = 88', math: '|P \\cup J \\cup C| = 120 - 37 + 5 = 88' }
      ],
      finalAnswer: '88 students know at least one programming language (and 100 - 88 = 12 know none).'
    },
    additionalPracticeExample: {
      problem: 'How many integers between 1 and 100 inclusive are divisible by 2 or 3?',
      solution: '|Div by 2| = floor(100/2) = 50. |Div by 3| = floor(100/3) = 33. |Div by 2 and 3 (i.e. 6)| = floor(100/6) = 16. Total = 50 + 33 - 16 = 67.',
      math: '50 + 33 - 16 = 67'
    },
    commonMistakes: [
      'Forgetting to add back the triple intersection |A ∩ B ∩ C|. Subtracting the three pairwise intersections removes the triple intersection three times, leaving it uncounted unless added back!'
    ],
    examTips: [
      'Remember the alternating sign pattern: + (singles) - (pairs) + (triples) - (quadruples).'
    ],
    practiceQuestions: [
      {
        id: 't12-q1',
        question: 'If |A| = 20, |B| = 25, and |A ∩ B| = 8, what is |A ∪ B|?',
        options: ['45', '37', '53', '17'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: '|A ∪ B| = 20 + 25 - 8 = 37.',
        hint: '20 + 25 - 8'
      },
      {
        id: 't12-q2',
        question: 'How many integers from 1 to 50 are divisible by either 3 or 5?',
        options: ['26', '23', '20', '30'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'floor(50/3) = 16. floor(50/5) = 10. floor(50/15) = 3. Total = 16 + 10 - 3 = 23.',
        hint: '16 + 10 - 3'
      },
      {
        id: 't12-q3',
        question: 'True or False: In a 3-set inclusion-exclusion formula, the triple intersection term has a negative sign.',
        options: ['True', 'False'],
        correctAnswer: '1',
        type: 'true-false',
        explanation: 'False. The signs alternate: + singles, - pairs, + triples. The triple intersection is added with a plus sign.',
        hint: 'Alternating signs: + then - then +'
      }
    ]
  },
  {
    id: 'topic-13',
    number: 13,
    title: 'Derangements & Applications',
    category: 'Theorems & Principles',
    shortSummary: 'A derangement is a permutation where no element appears in its original position. D(n) = n! sum((-1)^k / k!).',
    simpleDefinition: 'A derangement is a complete reshuffling of n items where every single item ends up in the WRONG spot (zero fixed points).',
    intuitiveExplanation: 'Suppose 4 people check their hats at a restaurant. When leaving, the attendant gives each person a hat completely at random. A derangement means NOT ONE single person gets their own hat back!',
    simpleLanguageExplanation: 'An arrangement where nobody gets what was originally theirs. Letter 1 does not go into envelope 1, letter 2 does not go into envelope 2, and so on.',
    primaryFormula: {
      name: 'Derangement Formula (Subfactorial !n)',
      latex: 'D(n) = !n = n! \\sum_{k=0}^{n} \\frac{(-1)^k}{k!} = n! \\left(1 - \\frac{1}{1!} + \\frac{1}{2!} - \\frac{1}{3!} + \\dots + \\frac{(-1)^n}{n!} \\right)',
      meaningOfSymbols: [
        { symbol: 'D(n) \\text{ or } !n', meaning: 'Number of derangements of n distinct items (subfactorial)' },
        { symbol: '(-1)^k', meaning: 'Alternating signs derived directly from the Principle of Inclusion-Exclusion' },
        { symbol: 'D(n) \\approx n!/e', meaning: 'As n grows, the probability of a random permutation being a derangement approaches 1/e ≈ 0.3679' }
      ],
      whenToUse: 'Use when calculating Secret Santa assignments, hat-check problems, or testing if permutations have zero fixed points.'
    },
    workedExample: {
      problem: 'Calculate the number of derangements for n = 4 letters into 4 addressed envelopes.',
      stepByStep: [
        { step: 1, title: 'Write values for small n', detail: 'D(1) = 0, D(2) = 1, D(3) = 2. Now compute D(4).' },
        { step: 2, title: 'Apply derangement expansion', detail: 'D(4) = 4! * [1 - 1/1! + 1/2! - 1/3! + 1/4!]', math: 'D(4) = 24 \\left(1 - 1 + \\frac{1}{2} - \\frac{1}{6} + \\frac{1}{24} \\right)' },
        { step: 3, title: 'Multiply through', detail: '24 * (0 + 12/24 - 4/24 + 1/24) = 12 - 4 + 1 = 9', math: 'D(4) = 9' }
      ],
      finalAnswer: 'There are exactly 9 derangements for 4 items.'
    },
    additionalPracticeExample: {
      problem: 'Using the recurrence relation D(n) = (n - 1)[D(n - 1) + D(n - 2)], compute D(5) knowing D(3) = 2 and D(4) = 9.',
      solution: 'D(5) = (5 - 1) * [D(4) + D(3)] = 4 * [9 + 2] = 4 * 11 = 44.',
      math: 'D(5) = 4 \\times (9 + 2) = 44'
    },
    commonMistakes: [
      'Thinking D(1) = 1. If there is only 1 item, it MUST go to its own position, so there are 0 derangements: D(1) = 0.'
    ],
    examTips: [
      'Memorize the first few values: D(1)=0, D(2)=1, D(3)=2, D(4)=9, D(5)=44, D(6)=265.',
      'Recurrence: D(n) = (n - 1)[D(n - 1) + D(n - 2)] or D(n) = n D(n - 1) + (-1)^n.'
    ],
    practiceQuestions: [
      {
        id: 't13-q1',
        question: 'What is the value of D(3) (the number of derangements of 3 elements)?',
        options: ['1', '2', '3', '6'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'D(3) = 3! * (1 - 1 + 1/2 - 1/6) = 6 * (1/3) = 2.',
        hint: 'D(3) = 2.'
      },
      {
        id: 't13-q2',
        question: 'What is the limit of the ratio D(n) / n! as n approaches infinity?',
        options: ['0', '1', '1/e', '1/2'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: 'The series sum is the Taylor series of e^(-1) = 1/e ≈ 0.367879.',
        hint: 'Related to Euler\'s number e.'
      },
      {
        id: 't13-q3',
        question: 'True or False: If 4 letters are placed into 4 envelopes, there are 9 ways where no letter matches its envelope.',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. D(4) = 9.',
        hint: 'D(4) = 9.'
      }
    ]
  },
  {
    id: 'topic-14',
    number: 14,
    title: 'Multisets',
    category: 'Multisets & Partitions',
    shortSummary: 'A multiset is a generalization of a set where elements are allowed to appear more than once (multiplicity).',
    simpleDefinition: 'A multiset is an unordered collection of objects where members can be repeated multiple times.',
    intuitiveExplanation: 'In standard set theory, {A, A, B} is just {A, B} because sets ignore duplicates. But in a multiset, duplicates count! A bag with two red marbles and one blue marble is written as {2 * Red, 1 * Blue} or {R, R, B}.',
    simpleLanguageExplanation: 'Like a shopping cart: you can have 3 apples and 2 oranges in the same basket. Each item\'s frequency is its multiplicity.',
    primaryFormula: {
      name: 'Multiset Cardinality & Representation',
      latex: 'M = \\{m_1 \\cdot x_1, \\, m_2 \\cdot x_2, \\, \\dots, \\, m_k \\cdot x_k\\}, \\quad |M| = \\sum_{i=1}^{k} m_i',
      meaningOfSymbols: [
        { symbol: 'm_i', meaning: 'Multiplicity (repetition count) of distinct element x_i' },
        { symbol: 'x_i', meaning: 'Distinct underlying element type' },
        { symbol: '|M|', meaning: 'Total cardinality: sum of all multiplicities' }
      ],
      whenToUse: 'Use when modeling data streams with frequencies, bag data structures, chemical formulas, and inventory systems.'
    },
    workedExample: {
      problem: 'Let multiset A = {3*a, 2*b, 1*c} and multiset B = {1*a, 3*b, 2*d}. Find the union multiset A ∪ B and intersection multiset A ∩ B.',
      stepByStep: [
        { step: 1, title: 'Union of multisets', detail: 'The union takes the MAXIMUM multiplicity of each element from either set.', math: 'A \\cup B = \\{ \\max(3,1)a, \\; \\max(2,3)b, \\; \\max(1,0)c, \\; \\max(0,2)d \\} = \\{3a, 3b, 1c, 2d\\}' },
        { step: 2, title: 'Intersection of multisets', detail: 'The intersection takes the MINIMUM multiplicity of each element.', math: 'A \\cap B = \\{ \\min(3,1)a, \\; \\min(2,3)b, \\; \\min(1,0)c, \\; \\min(0,2)d \\} = \\{1a, 2b\\}' }
      ],
      finalAnswer: 'Union is {3*a, 3*b, 1*c, 2*d} with size 9; Intersection is {1*a, 2*b} with size 3.'
    },
    additionalPracticeExample: {
      problem: 'What is the cardinality of the multiset of letters in the word "SUCCESS"?',
      solution: 'Letters: S appears 3 times, U appears 1 time, C appears 2 times, E appears 1 time. Cardinality = 3 + 1 + 2 + 1 = 7.',
      math: '|M| = 3 + 1 + 2 + 1 = 7'
    },
    commonMistakes: [
      'Assuming multiset union adds the counts together. Addition of multiplicities is the multiset SUM (A ⊎ B), whereas multiset UNION takes the maximum of the multiplicities.'
    ],
    examTips: [
      'Multiset union = max(m_A, m_B).',
      'Multiset intersection = min(m_A, m_B).'
    ],
    practiceQuestions: [
      {
        id: 't14-q1',
        question: 'If multiset X = {4*a, 1*b} and Y = {2*a, 3*b}, what is X ∩ Y?',
        options: ['{6*a, 4*b}', '{2*a, 1*b}', '{4*a, 3*b}', '{a, b}'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'Intersection takes min: min(4,2) = 2 for a, and min(1,3) = 1 for b. So {2*a, 1*b}.',
        hint: 'Take the minimum multiplicity for each letter.'
      },
      {
        id: 't14-q2',
        question: 'What is the cardinality of the multiset representing the letters of "DATABASE"?',
        options: ['6', '8', '3', '7'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'The word DATABASE has 8 total letters: D:1, A:3, T:1, B:1, S:1, E:1. Cardinality = 8.',
        hint: 'Total count of characters.'
      },
      {
        id: 't14-q3',
        question: 'True or False: In a standard set, {a, a, b} is identical to {a, b}, but in a multiset they are distinct.',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. Multisets preserve element multiplicity (frequencies).',
        hint: 'Multisets care about counts.'
      }
    ]
  },
  {
    id: 'topic-15',
    number: 15,
    title: 'Permutations & Combinations of Multisets',
    category: 'Multisets & Partitions',
    shortSummary: 'Arranging items with repetitions: n! / (n1! n2! ... nk!), and choosing r items from k types with replacement: C(r+k-1, r).',
    simpleDefinition: 'Formulas for arranging words with repeated letters (like MISSISSIPPI) and selecting combinations when items can be selected multiple times (Stars and Bars).',
    intuitiveExplanation: 'If you have letters A, A, B, swapping the two identical As does not create a new word. So you divide 3! by 2! = 3 arrangements: AAB, ABA, BAA. For selections with unlimited repetition (like buying 5 donuts from 3 flavors), you use the Stars and Bars formula C(n+r-1, r).',
    simpleLanguageExplanation: 'To arrange words with repeated letters, divide by the factorials of the repeat counts. To pick a bag of mixed candies from flavors, use Stars & Bars.',
    primaryFormula: {
      name: 'Multiset Permutations & Combinations (Stars and Bars)',
      latex: '\\text{Permutation: } \\frac{n!}{n_1! n_2! \\cdots n_k!}, \\quad \\text{Combination: } \\binom{r + k - 1}{r} = \\binom{r + k - 1}{k - 1}',
      meaningOfSymbols: [
        { symbol: 'n_i', meaning: 'Number of repetitions of the i-th distinct object, where n = n1 + ... + nk' },
        { symbol: 'k', meaning: 'Number of distinct categories/types of items available' },
        { symbol: 'r', meaning: 'Total number of items chosen with replacement allowed' }
      ],
      whenToUse: 'Use multiset permutations for anagrams of words with repeated letters. Use multiset combinations for distributing identical items or selecting with replacement.'
    },
    workedExample: {
      problem: 'Find the number of distinct permutations of all the letters in the word "MISSISSIPPI".',
      stepByStep: [
        { step: 1, title: 'Count total letters (n)', detail: 'Total letter count n = 11.' },
        { step: 2, title: 'Find frequencies of each letter', detail: 'M: 1, I: 4, S: 4, P: 2. Check: 1 + 4 + 4 + 2 = 11.' },
        { step: 3, title: 'Apply multiset permutation formula', detail: 'Divide n! by the product of the factorials of each letter frequency.', math: 'N = \\frac{11!}{1! \\times 4! \\times 4! \\times 2!} = \\frac{39,916,800}{1 \\times 24 \\times 24 \\times 2} = \\frac{39,916,800}{1,152} = 34,650' }
      ],
      finalAnswer: 'There are 34,650 distinct permutations of MISSISSIPPI.'
    },
    additionalPracticeExample: {
      problem: 'A bakery sells 4 varieties of cookies: chocolate, vanilla, oatmeal, and peanut butter. In how many ways can a customer buy a box of 6 cookies?',
      solution: 'k = 4 varieties, r = 6 cookies. Stars and Bars: C(r + k - 1, r) = C(6 + 4 - 1, 6) = C(9, 6) = C(9, 3) = (9 * 8 * 7) / 6 = 84 ways.',
      math: 'C(9,6) = 84'
    },
    commonMistakes: [
      'In Stars and Bars, mixing up k (number of types) and r (number of items being chosen). Remember: you are placing r items into k categories, so you need k - 1 dividers!'
    ],
    examTips: [
      'Number of non-negative integer solutions to x1 + x2 + ... + xk = r is exactly C(r + k - 1, r).'
    ],
    practiceQuestions: [
      {
        id: 't15-q1',
        question: 'How many distinct arrangements can be formed from the letters in "BANANA"?',
        options: ['720', '60', '120', '24'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'Letters in BANANA: n = 6 (B:1, A:3, N:2). Formula = 6! / (1! * 3! * 2!) = 720 / (6 * 2) = 60.',
        hint: '6! / (3! * 2!)'
      },
      {
        id: 't15-q2',
        question: 'How many non-negative integer solutions exist for x1 + x2 + x3 = 5?',
        options: ['15', '21', '35', '10'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'r = 5, k = 3. C(r + k - 1, r) = C(5 + 3 - 1, 5) = C(7, 5) = C(7, 2) = 21.',
        hint: 'C(7,2)'
      },
      {
        id: 't15-q3',
        question: 'True or False: The number of distinct permutations of n objects where n1 are identical of type 1 and n2 of type 2 is n! / (n1! * n2!).',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. Identical items within a group are interchangeable, so we divide by the factorial of each group size.',
        hint: 'Division cancels duplicate permutations.'
      }
    ]
  },
  {
    id: 'topic-16',
    number: 16,
    title: 'Integer Partitions and Compositions',
    category: 'Multisets & Partitions',
    shortSummary: 'Partition: writing n as sum of positive integers where order DOES NOT matter. Composition: order DOES matter.',
    simpleDefinition: 'A partition splits an integer into smaller integer parts regardless of order. A composition splits an integer where the sequence/order of parts matters.',
    intuitiveExplanation: 'Consider the number 3. Partitions of 3: {3}, {2+1}, {1+1+1} (3 partitions). Compositions of 3: 3, 2+1, 1+2, 1+1+1 (4 compositions). In compositions, 2+1 is distinct from 1+2!',
    simpleLanguageExplanation: 'Partitions don\'t care about order (3+1 and 1+3 are the same). Compositions DO care about order (3+1 and 1+3 are different).',
    primaryFormula: {
      name: 'Integer Partition Function p(n) & Compositions',
      latex: 'p(n) = \\text{number of partitions of } n, \\quad \\text{Compositions of } n = 2^{n-1}',
      meaningOfSymbols: [
        { symbol: 'p(n)', meaning: 'Partition function: number of ways to express n as sum of positive integers (order-free)' },
        { symbol: '2^{n-1}', meaning: 'Total number of ordered compositions of a positive integer n' }
      ],
      whenToUse: 'Use compositions for ordered sums (e.g. dice sum combinations) and partitions for unordered integer groupings.'
    },
    workedExample: {
      problem: 'List all valid integer partitions of 4, find p(4), and calculate the total number of compositions of 4.',
      stepByStep: [
        { step: 1, title: 'List partitions of 4 in non-increasing order', detail: '1) 4,  2) 3 + 1,  3) 2 + 2,  4) 2 + 1 + 1,  5) 1 + 1 + 1 + 1' },
        { step: 2, title: 'Determine p(4)', detail: 'There are exactly 5 valid partitions, so p(4) = 5.' },
        { step: 3, title: 'Calculate compositions of 4', detail: 'Using the formula 2^(n - 1) with n = 4:', math: '2^{4-1} = 2^3 = 8 \\text{ compositions}' }
      ],
      finalAnswer: 'p(4) = 5 partitions; and there are 8 compositions of 4.'
    },
    additionalPracticeExample: {
      problem: 'List all partitions of 5 and find p(5).',
      solution: '5; 4+1; 3+2; 3+1+1; 2+2+1; 2+1+1+1; 1+1+1+1+1. Total = 7 partitions, so p(5) = 7.',
      math: 'p(5) = 7'
    },
    commonMistakes: [
      'Listing 3+1 and 1+3 as two different partitions. In partitions, order does not matter; by convention, write parts in descending order: 3 + 1.'
    ],
    examTips: [
      'Memorize small values: p(1)=1, p(2)=2, p(3)=3, p(4)=5, p(5)=7, p(6)=11.',
      'Total compositions of n into positive integers is always 2^(n-1).'
    ],
    practiceQuestions: [
      {
        id: 't16-q1',
        question: 'What is the value of p(4), the number of integer partitions of 4?',
        options: ['4', '5', '8', '7'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'The partitions of 4 are: 4, 3+1, 2+2, 2+1+1, 1+1+1+1. There are 5 partitions.',
        hint: 'p(4) = 5.'
      },
      {
        id: 't16-q2',
        question: 'How many compositions (ordered partitions) are there for the integer n = 5?',
        options: ['7', '16', '32', '8'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'Compositions of n = 2^(n - 1) = 2^(5 - 1) = 2^4 = 16.',
        hint: '2^(5-1)'
      },
      {
        id: 't16-q3',
        question: 'True or False: In an integer partition, 2 + 1 and 1 + 2 are counted as two separate partitions.',
        options: ['True', 'False'],
        correctAnswer: '1',
        type: 'true-false',
        explanation: 'False. Partitions are unordered (order does not matter). In compositions they are distinct, but in partitions they are the same.',
        hint: 'Partitions do not care about order.'
      }
    ]
  },
  {
    id: 'topic-17',
    number: 17,
    title: 'Ferrers Diagrams, Young Diagrams & Conjugates',
    category: 'Multisets & Partitions',
    shortSummary: 'Visual representation of partitions using dots (Ferrers) or boxes (Young). Conjugate is formed by transposing rows into columns.',
    simpleDefinition: 'A Ferrers diagram displays a partition as left-justified rows of dots. A Young diagram uses square boxes. Flipping rows and columns produces the conjugate partition.',
    intuitiveExplanation: 'Take the partition of 6 as 4 + 2. In Ferrers dots: row 1 has 4 dots (• • • •), row 2 has 2 dots (• •). Now read the columns vertically! Column 1 has 2 dots, Column 2 has 2 dots, Column 3 has 1 dot, Column 4 has 1 dot. That gives 2 + 2 + 1 + 1! This is the conjugate partition.',
    simpleLanguageExplanation: 'A grid of dots showing how an integer is split. Turn the diagram on its side (transpose) to get the "conjugate" partition.',
    primaryFormula: {
      name: 'Conjugate Partition Transformation',
      latex: '\\lambda = (\\lambda_1, \\lambda_2, \\dots, \\lambda_k) \\iff \\lambda^* = (\\lambda_1^*, \\lambda_2^*, \\dots, \\lambda_m^*), \\quad \\text{Self-conjugate: } \\lambda = \\lambda^*',
      meaningOfSymbols: [
        { symbol: '\\lambda', meaning: 'The original partition written in non-increasing order: lambda1 >= lambda2 >= ...' },
        { symbol: '\\lambda^*', meaning: 'The conjugate partition obtained by transposing rows into columns' },
        { symbol: '\\text{Self-conjugate}', meaning: 'A partition whose Ferrers diagram is symmetric across its main diagonal' }
      ],
      whenToUse: 'Use to prove partition identities, such as: the number of partitions into at most k parts equals the number of partitions with largest part at most k.'
    },
    workedExample: {
      problem: 'Draw the Ferrers diagram for the partition (4, 2, 1) of the integer 7, and find its conjugate partition.',
      stepByStep: [
        { step: 1, title: 'Draw rows of dots for (4, 2, 1)', detail: 'Row 1: • • • • (4 dots)\nRow 2: • • (2 dots)\nRow 3: • (1 dot)' },
        { step: 2, title: 'Count dots column by column', detail: 'Col 1 has 3 dots (rows 1, 2, 3).\nCol 2 has 2 dots (rows 1, 2).\nCol 3 has 1 dot (row 1).\nCol 4 has 1 dot (row 1).' },
        { step: 3, title: 'Write the conjugate partition', detail: 'The conjugate partition is (3, 2, 1, 1). Check sum: 3 + 2 + 1 + 1 = 7.', math: '\\lambda = (4, 2, 1) \\implies \\lambda^* = (3, 2, 1, 1)' }
      ],
      finalAnswer: 'The conjugate partition of (4, 2, 1) is (3, 2, 1, 1).'
    },
    additionalPracticeExample: {
      problem: 'Determine if the partition (3, 2, 1) of 6 is self-conjugate.',
      solution: 'Rows: 3, 2, 1. Columns: Col 1 has 3 dots, Col 2 has 2 dots, Col 3 has 1 dot. The conjugate is (3, 2, 1), which equals the original! Thus (3, 2, 1) is self-conjugate.',
      math: '(3, 2, 1)^* = (3, 2, 1) \\quad \\text{(Self-Conjugate)}'
    },
    commonMistakes: [
      'Assuming the conjugate of a partition has a different sum. The total number of dots or boxes remains the same (an invariant).',
      'Forgetting to left-justify the dots before reading columns.'
    ],
    examTips: [
      'A partition is self-conjugate if and only if its Ferrers diagram is symmetric across the main diagonal.',
      'Euler proved that the number of self-conjugate partitions of n equals the number of partitions of n into distinct odd parts!'
    ],
    practiceQuestions: [
      {
        id: 't17-q1',
        question: 'What is the conjugate partition of (5, 1)?',
        options: ['(5, 1)', '(2, 1, 1, 1, 1)', '(4, 2)', '(3, 3)'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'Row 1: 5 dots, Row 2: 1 dot. Col 1 has 2 dots, Cols 2, 3, 4, 5 each have 1 dot. Thus conjugate is (2, 1, 1, 1, 1).',
        hint: 'First column has 2 dots, remaining 4 columns have 1 dot each.'
      },
      {
        id: 't17-q2',
        question: 'Which of the following partitions of 6 is self-conjugate?',
        options: ['(4, 2)', '(3, 2, 1)', '(5, 1)', '(2, 2, 2)'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: '(3, 2, 1) transposed is (3, 2, 1). It is identical to its conjugate.',
        hint: 'Transposing row 1 (3 dots), row 2 (2 dots), row 3 (1 dot).'
      },
      {
        id: 't17-q3',
        question: 'True or False: In a Ferrers diagram, the number of dots in the diagram always equals the integer n being partitioned.',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. Each dot represents 1 unit, so the sum of dots is the integer n.',
        hint: 'Dots add up to the number.'
      }
    ]
  },
  {
    id: 'topic-18',
    number: 18,
    title: 'Recurrence Relations & Their Solutions',
    category: 'Recurrence Relations',
    shortSummary: 'Equations that express a term an in terms of preceding terms. Solved via characteristic roots.',
    simpleDefinition: 'A recurrence relation is a formula where each term in a sequence is calculated using earlier terms in the sequence.',
    intuitiveExplanation: 'If you earn $100 every month and your bank pays 5% interest on your previous balance, your balance next month depends directly on your balance this month: B(n) = 1.05 * B(n-1) + 100. That is a recurrence relation!',
    simpleLanguageExplanation: 'A rule that tells you how to get the NEXT number in a sequence by looking at the PREVIOUS numbers.',
    primaryFormula: {
      name: 'Second-Order Linear Homogeneous Recurrence Relation',
      latex: 'a_n = c_1 a_{n-1} + c_2 a_{n-2}, \\quad \\text{Characteristic: } r^2 - c_1 r - c_2 = 0',
      meaningOfSymbols: [
        { symbol: 'a_n', meaning: 'The n-th term of the sequence' },
        { symbol: 'c_1, c_2', meaning: 'Constant real coefficients' },
        { symbol: 'r_1, r_2', meaning: 'Roots of the quadratic characteristic polynomial' }
      ],
      whenToUse: 'Use to find closed-form formulas (general solutions) for algorithmic time complexities, dynamic programming, and sequence modeling.'
    },
    workedExample: {
      problem: 'Solve the recurrence relation a_n = 5 a_{n-1} - 6 a_{n-2} with initial conditions a_0 = 1 and a_1 = 4.',
      stepByStep: [
        { step: 1, title: 'Form the characteristic equation', detail: 'Substitute a_n = r^n:', math: 'r^2 - 5r + 6 = 0' },
        { step: 2, title: 'Factor the quadratic', detail: '(r - 2)(r - 3) = 0, which yields distinct real roots r1 = 2 and r2 = 3.', math: 'r_1 = 2, \\quad r_2 = 3' },
        { step: 3, title: 'Write general solution form', detail: 'a_n = A * (2^n) + B * (3^n)' },
        { step: 4, title: 'Apply initial conditions to find A and B', detail: 'For n = 0: a_0 = A + B = 1. For n = 1: a_1 = 2A + 3B = 4. From A = 1 - B, 2(1 - B) + 3B = 4 => B = 2, so A = -1.', math: 'A = -1, \\quad B = 2' },
        { step: 5, title: 'Write final closed form', detail: 'a_n = -(2^n) + 2 * (3^n) = 2(3^n) - 2^n.', math: 'a_n = 2(3^n) - 2^n' }
      ],
      finalAnswer: 'The closed-form solution is a_n = 2(3^n) - 2^n.'
    },
    additionalPracticeExample: {
      problem: 'If a recurrence is a_n = 2 a_{n-1} with a_0 = 3, find a_4.',
      solution: 'This is a geometric progression: a_n = 3 * (2^n). For n = 4: a_4 = 3 * 2^4 = 3 * 16 = 48.',
      math: 'a_4 = 3 \\times 16 = 48'
    },
    commonMistakes: [
      'Forgetting to check for repeated roots. If r1 = r2 = r, the general solution is (A + B*n) * r^n.'
    ],
    examTips: [
      'Order of a recurrence = the difference between the highest and lowest subscripts (e.g. an and an-2 is order 2).',
      'An order k linear recurrence requires exactly k initial conditions to find a unique solution.'
    ],
    practiceQuestions: [
      {
        id: 't18-q1',
        question: 'What is the characteristic equation of the recurrence a_n = 7 a_{n-1} - 12 a_{n-2}?',
        options: ['r^2 - 7r + 12 = 0', 'r^2 + 7r - 12 = 0', 'r^2 - 12r + 7 = 0', 'r^2 + 7r + 12 = 0'],
        correctAnswer: '0',
        type: 'mcq',
        explanation: 'Move all terms to one side: a_n - 7a_{n-1} + 12a_{n-2} = 0 gives r^2 - 7r + 12 = 0.',
        hint: 'r^2 - 7r + 12 = 0'
      },
      {
        id: 't18-q2',
        question: 'What is the order of the recurrence relation a_n = 3 a_{n-1} + 2 a_{n-2} - 5 a_{n-3}?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: 'The order is n - (n - 3) = 3 because it looks back 3 steps.',
        hint: 'Distance between n and n-3.'
      },
      {
        id: 't18-q3',
        question: 'True or False: If the characteristic equation has a repeated root r, the general solution is of the form a_n = (C1 + C2 * n) * r^n.',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. For a repeated root of multiplicity 2, an additional factor of n is introduced.',
        hint: 'Multiplicity adds powers of n.'
      }
    ]
  },
  {
    id: 'topic-19',
    number: 19,
    title: 'Fibonacci & Other Recurrence Examples',
    category: 'Recurrence Relations',
    shortSummary: 'Classic recurrences: Fibonacci sequence F(n) = F(n-1) + F(n-2), Factorial F(n) = n F(n-1), and Towers of Hanoi.',
    simpleDefinition: 'The Fibonacci recurrence generates each number by adding the two previous numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21...',
    intuitiveExplanation: 'Fibonacci originally modeled rabbit population growth. In computer science, Fibonacci numbers appear in Fibonacci heaps, search algorithms, golden ratio design, and divide-and-conquer runtime analysis.',
    simpleLanguageExplanation: 'Start with 0 and 1. Add them: 0 + 1 = 1. Add the last two: 1 + 1 = 2. Then 1 + 2 = 3. Keep going!',
    primaryFormula: {
      name: 'Fibonacci & Classic Recurrences',
      latex: 'F_n = F_{n-1} + F_{n-2} \\; (F_0=0, F_1=1), \\quad T_n = 2T_{n-1} + 1 \\implies T_n = 2^n - 1',
      meaningOfSymbols: [
        { symbol: 'F_n', meaning: 'The n-th Fibonacci number' },
        { symbol: 'T_n', meaning: 'Minimum moves to solve Towers of Hanoi puzzle with n disks' },
        { symbol: '\\phi = \\frac{1+\\sqrt{5}}{2}', meaning: 'Golden ratio (approx 1.618) from Binet\'s closed-form formula' }
      ],
      whenToUse: 'Use to model rabbit breeding, recursive algorithm step counts (Hanoi), and tiling domino problems.'
    },
    workedExample: {
      problem: 'Compute the first 8 Fibonacci numbers starting from F(0) = 0, and verify Binet\'s characteristic roots.',
      stepByStep: [
        { step: 1, title: 'State initial conditions', detail: 'F(0) = 0, F(1) = 1.' },
        { step: 2, title: 'Generate next terms iteratively', detail: 'F(2) = 0 + 1 = 1\nF(3) = 1 + 1 = 2\nF(4) = 1 + 2 = 3\nF(5) = 2 + 3 = 5\nF(6) = 3 + 5 = 8\nF(7) = 5 + 8 = 13' },
        { step: 3, title: 'Find characteristic roots', detail: 'Characteristic equation: r^2 - r - 1 = 0. By quadratic formula:', math: 'r = \\frac{1 \\pm \\sqrt{1 - 4(1)(-1)}}{2} = \\frac{1 \\pm \\sqrt{5}}{2}' }
      ],
      finalAnswer: 'Terms: 0, 1, 1, 2, 3, 5, 8, 13. Roots are the golden ratio phi = (1 + sqrt(5))/2 and (1 - sqrt(5))/2.'
    },
    additionalPracticeExample: {
      problem: 'For the Towers of Hanoi recurrence T(n) = 2 T(n-1) + 1 with T(1) = 1, find the minimum moves required for 4 disks.',
      solution: 'T(1) = 1, T(2) = 2(1)+1 = 3, T(3) = 2(3)+1 = 7, T(4) = 2(7)+1 = 15. Notice T(n) = 2^n - 1: 2^4 - 1 = 16 - 1 = 15 moves.',
      math: 'T(4) = 2^4 - 1 = 15'
    },
    commonMistakes: [
      'Mixing up F(0)=0 vs F(1)=1. Be clear whether your sequence is indexed starting at 0 or 1.'
    ],
    examTips: [
      'Binet\'s Formula: F(n) = [phi^n - (-phi)^(-n)] / sqrt(5).',
      'The number of ways to tile a 2 x n rectangle with 1 x 2 dominoes is exactly F(n+1)!'
    ],
    practiceQuestions: [
      {
        id: 't19-q1',
        question: 'What is F(6) in the Fibonacci sequence starting with F(0)=0 and F(1)=1?',
        options: ['5', '8', '13', '21'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8.',
        hint: 'F(5) + F(4) = 5 + 3 = 8.'
      },
      {
        id: 't19-q2',
        question: 'What is the minimum number of moves to solve the Towers of Hanoi with 5 disks?',
        options: ['15', '25', '31', '32'],
        correctAnswer: '2',
        type: 'mcq',
        explanation: 'T(n) = 2^n - 1. For n = 5: 2^5 - 1 = 32 - 1 = 31 moves.',
        hint: '2^5 - 1'
      },
      {
        id: 't19-q3',
        question: 'True or False: The ratio of successive Fibonacci numbers F(n+1)/F(n) approaches the Golden Ratio (approx 1.618) as n grows.',
        options: ['True', 'False'],
        correctAnswer: '0',
        type: 'true-false',
        explanation: 'True. The limit as n -> infinity of F(n+1)/F(n) is phi = (1 + sqrt(5))/2 ≈ 1.6180339887...',
        hint: 'Known as the Golden Ratio.'
      }
    ]
  },
  {
    id: 'topic-20',
    number: 20,
    title: 'Unit Summary & Formula Revision',
    category: 'Counting Principles',
    shortSummary: 'Master exam recap sheet for Unit 1: Key theorems, formulas, quick comparison matrix, and strategic problem-solving steps.',
    simpleDefinition: 'The comprehensive revision checklist covering all combinatorial formulas, decision trees, and exam strategies for MDC5001C Unit 1.',
    intuitiveExplanation: 'When looking at any examination question, use this simple 3-step decision flow: 1) Are outcomes mutually exclusive or sequential? (Add vs Multiply) 2) Does the order of selected objects matter? (Permutation vs Combination) 3) Are repetitions or duplicates present? (Standard vs Multiset / Stars & Bars).',
    simpleLanguageExplanation: 'Your cheat-sheet summary before stepping into the exam hall: every formula at a glance with tips on how to identify which one to apply.',
    primaryFormula: {
      name: 'Master Formula Matrix',
      latex: 'P(n,r)=\\frac{n!}{(n-r)!}, \\; C(n,r)=\\frac{n!}{r!(n-r)!}, \\; \\text{Stars & Bars: } \\binom{r+k-1}{r}, \\; D(n)=n!\\sum\\frac{(-1)^k}{k!}',
      meaningOfSymbols: [
        { symbol: 'P(n,r)', meaning: 'Arrangements (order matters, no repeats)' },
        { symbol: 'C(n,r)', meaning: 'Selections/Subsets (order does not matter, no repeats)' },
        { symbol: 'n^r', meaning: 'Arrangements with repetition' },
        { symbol: 'D(n)', meaning: 'Derangements (zero fixed points)' }
      ],
      whenToUse: 'Review this topic right before attempting the mock exam or taking your university semester assessment.'
    },
    workedExample: {
      problem: 'Classify each scenario into its correct combinatorial model:\n(A) Creating a 4-digit code using {1,2,3,4,5,6} without repeating digits.\n(B) Choosing 3 students to form a library committee.\n(C) Distributing 10 identical gold coins among 3 children.',
      stepByStep: [
        { step: 1, title: 'Analyze Scenario (A)', detail: 'Digits in code: order matters, no repeats => Permutation P(6, 4) = 6! / 2! = 360.' },
        { step: 2, title: 'Analyze Scenario (B)', detail: 'Committee members have no titles: order does NOT matter, no repeats => Combination C(n, 3).' },
        { step: 3, title: 'Analyze Scenario (C)', detail: 'Identical items distributed into distinct categories => Combinations with repetition / Stars and Bars with r = 10, k = 3: C(10 + 3 - 1, 10) = C(12, 10) = 66.' }
      ],
      finalAnswer: '(A) Permutation P(6,4); (B) Combination C(n,3); (C) Stars & Bars C(12,10).'
    },
    additionalPracticeExample: {
      problem: 'How many terms are in the expansion of (x1 + x2 + x3)^10?',
      solution: 'This is the number of non-negative integer solutions to e1 + e2 + e3 = 10. By Stars & Bars: C(10 + 3 - 1, 10) = C(12, 10) = C(12, 2) = 66 terms.',
      math: 'C(12,2) = 66'
    },
    commonMistakes: [
      'Rushing into calculating factorials before determining whether order matters.',
      'Forgetting to simplify fractions in combinations before multiplying huge numbers.'
    ],
    examTips: [
      'Write down the given variables (n, r, k) and verify constraints (repetition allowed?, at least one?, order matters?).',
      'Double check your answers using small numbers (e.g. test n=2 or n=3) to verify formulas.'
    ],
    practiceQuestions: [
      {
        id: 't20-q1',
        question: 'Which formula should you use to find the number of ways to choose 4 officers (President, VP, Sec, Treas) from 15 people?',
        options: ['C(15, 4)', 'P(15, 4)', '15^4', 'C(15+4-1, 4)'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'Because each officer has a distinct post/rank, order matters without repetition. Thus P(15, 4).',
        hint: 'Distinct titles mean order matters.'
      },
      {
        id: 't20-q2',
        question: 'Which principle guarantees that if you pick 5 cards from a regular deck, at least 2 cards must be of the same suit?',
        options: ['Multiplication Principle', 'Pigeonhole Principle', 'Binomial Theorem', 'Derangements'],
        correctAnswer: '1',
        type: 'mcq',
        explanation: 'There are only 4 suits (hearts, diamonds, clubs, spades). By Pigeonhole Principle, picking 4 + 1 = 5 cards guarantees at least 2 share a suit.',
        hint: '4 suits are pigeonholes, 5 cards are pigeons.'
      },
      {
        id: 't20-q3',
        question: 'True or False: In discrete mathematics, order matters in combinations and does not matter in permutations.',
        options: ['True', 'False'],
        correctAnswer: '1',
        type: 'true-false',
        explanation: 'False! Order MATTERS in permutations, and DOES NOT matter in combinations.',
        hint: 'Permutations = order matters; Combinations = order does not matter.'
      }
    ]
  }
];
