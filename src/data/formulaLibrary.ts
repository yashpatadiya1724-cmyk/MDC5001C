import { FormulaItem } from '../types';

export const FORMULA_LIBRARY: FormulaItem[] = [
  {
    id: 'f-add-rule',
    name: 'Addition Rule (Disjoint Sets)',
    category: 'Counting Principles',
    latex: '|A \\cup B| = |A| + |B| \\quad (\\text{when } A \\cap B = \\emptyset)',
    whenToUse: 'Use when choosing between mutually exclusive events (Event A OR Event B, but not both simultaneously).',
    variables: [
      { symbol: '|A|', description: 'Number of ways event A can occur' },
      { symbol: '|B|', description: 'Number of ways event B can occur' },
      { symbol: '|A ∪ B|', description: 'Total ways either A or B can occur' }
    ],
    workedExample: {
      problem: 'Choose 1 book from 8 mathematics books or 6 computer science books.',
      calculation: '8 + 6 = 14',
      result: '14 ways'
    },
    practiceQuestion: {
      question: 'A student can choose 1 elective from either 4 AI courses or 5 Web courses. How many total elective options exist?',
      options: ['9', '20', '4', '5'],
      correctIndex: 0,
      explanation: 'By the Addition Rule: 4 + 5 = 9 options.'
    }
  },
  {
    id: 'f-mult-rule',
    name: 'Multiplication Rule (Product Rule)',
    category: 'Counting Principles',
    latex: 'N = n_1 \\times n_2 \\times \\dots \\times n_k = \\prod_{i=1}^k n_i',
    whenToUse: 'Use when an outcome is formed by a sequence of independent or conditional stages done in series (Choice 1 AND Choice 2).',
    variables: [
      { symbol: 'n_i', description: 'Number of possible choices at stage i' },
      { symbol: 'k', description: 'Total number of sequential stages' },
      { symbol: 'N', description: 'Total number of compound outcomes' }
    ],
    workedExample: {
      problem: 'Form a 3-character license plate: 1 uppercase letter followed by 2 digits.',
      calculation: '26 * 10 * 10 = 2,600',
      result: '2,600 plates'
    },
    practiceQuestion: {
      question: 'How many 2-digit odd numbers can be formed using digits {1, 2, 3, 4, 5, 6} if repetition is allowed?',
      options: ['18', '36', '15', '12'],
      correctIndex: 0,
      explanation: 'First digit can be any of 6 digits. Second digit must be odd {1, 3, 5} (3 choices). Total = 6 * 3 = 18.'
    }
  },
  {
    id: 'f-perm-distinct',
    name: 'Permutations (No Repetition)',
    category: 'Permutations',
    latex: 'P(n,r) = {}^n P_r = \\frac{n!}{(n-r)!}',
    whenToUse: 'Use when selecting and arranging r items from n distinct items where the ORDER OF ARRANGEMENT MATTERS.',
    variables: [
      { symbol: 'n', description: 'Total number of distinct items available' },
      { symbol: 'r', description: 'Number of items selected and arranged' },
      { symbol: 'n!', description: 'Factorial: n * (n-1) * ... * 1' }
    ],
    workedExample: {
      problem: 'In how many ways can 1st, 2nd, and 3rd place prizes be awarded to 8 contestants?',
      calculation: 'P(8, 3) = 8! / 5! = 8 * 7 * 6 = 336',
      result: '336 ways'
    },
    practiceQuestion: {
      question: 'Calculate P(7, 2).',
      options: ['42', '21', '49', '14'],
      correctIndex: 0,
      explanation: 'P(7, 2) = 7 * 6 = 42.'
    }
  },
  {
    id: 'f-perm-rep',
    name: 'Permutations with Repetition Allowed',
    category: 'Permutations',
    latex: 'N = n^r',
    whenToUse: 'Use when choosing r positions from n choices where identical items can be selected repeatedly across positions.',
    variables: [
      { symbol: 'n', description: 'Number of types or symbols available for each position' },
      { symbol: 'r', description: 'Total length/number of positions to fill' }
    ],
    workedExample: {
      problem: 'Total 4-digit bank PIN codes using digits 0 through 9.',
      calculation: '10^4 = 10,000',
      result: '10,000 PINs'
    },
    practiceQuestion: {
      question: 'How many binary strings of length 6 can be created?',
      options: ['64', '36', '12', '128'],
      correctIndex: 0,
      explanation: '2^6 = 64.'
    }
  },
  {
    id: 'f-comb-distinct',
    name: 'Combinations (No Repetition)',
    category: 'Combinations',
    latex: 'C(n,r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}',
    whenToUse: 'Use when selecting a subset or group of r items from n distinct items where the ORDER DOES NOT MATTER.',
    variables: [
      { symbol: 'n', description: 'Total number of items in the population' },
      { symbol: 'r', description: 'Number of items chosen into the subset' },
      { symbol: 'r!', description: 'Divisor that eliminates order among the r chosen items' }
    ],
    workedExample: {
      problem: 'Choose a committee of 4 students from 12 candidates.',
      calculation: 'C(12, 4) = (12 * 11 * 10 * 9) / (4 * 3 * 2 * 1) = 495',
      result: '495 committees'
    },
    practiceQuestion: {
      question: 'What is C(9, 2)?',
      options: ['36', '72', '18', '81'],
      correctIndex: 0,
      explanation: 'C(9, 2) = (9 * 8) / 2 = 36.'
    }
  },
  {
    id: 'f-perm-comb-rel',
    name: 'Permutation-Combination Relationship',
    category: 'Key Identities',
    latex: 'P(n,r) = r! \\times C(n,r) \\iff C(n,r) = \\frac{P(n,r)}{r!}',
    whenToUse: 'Use to connect ordered permutations with unordered combinations.',
    variables: [
      { symbol: 'P(n,r)', description: 'Permutations count' },
      { symbol: 'C(n,r)', description: 'Combinations count' },
      { symbol: 'r!', description: 'Number of ways to arrange the r chosen items' }
    ],
    workedExample: {
      problem: 'If C(n, 3) = 20, what is P(n, 3)?',
      calculation: 'P(n, 3) = 3! * C(n, 3) = 6 * 20 = 120',
      result: '120'
    },
    practiceQuestion: {
      question: 'Given P(n, 2) = 56, what is C(n, 2)?',
      options: ['28', '112', '14', '56'],
      correctIndex: 0,
      explanation: 'C(n, 2) = P(n, 2) / 2! = 56 / 2 = 28.'
    }
  },
  {
    id: 'f-pascal-identity',
    name: "Pascal's Identity",
    category: 'Key Identities',
    latex: '\\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r}',
    whenToUse: 'Use to compute combinatorial values recursively or prove identities based on inclusion/exclusion of a specific element.',
    variables: [
      { symbol: 'C(n, r)', description: 'Total ways to choose r from n' },
      { symbol: 'C(n-1, r-1)', description: 'Ways when a designated element x is included' },
      { symbol: 'C(n-1, r)', description: 'Ways when element x is excluded' }
    ],
    workedExample: {
      problem: 'Compute C(6, 3) using values from row 5: C(5, 2) = 10 and C(5, 3) = 10.',
      calculation: 'C(6, 3) = C(5, 2) + C(5, 3) = 10 + 10 = 20',
      result: '20'
    },
    practiceQuestion: {
      question: 'If C(7, 4) = 35 and C(7, 3) = 35, what is C(8, 4)?',
      options: ['70', '35', '140', '56'],
      correctIndex: 0,
      explanation: 'By Pascal\'s identity: C(8, 4) = C(7, 3) + C(7, 4) = 35 + 35 = 70.'
    }
  },
  {
    id: 'f-symmetry',
    name: 'Combination Symmetry Identity',
    category: 'Key Identities',
    latex: '\\binom{n}{r} = \\binom{n}{n-r}',
    whenToUse: 'Use to drastically simplify combination arithmetic when r > n/2 (e.g. C(50, 48) = C(50, 2)).',
    variables: [
      { symbol: 'r', description: 'Number of items chosen' },
      { symbol: 'n - r', description: 'Number of items left behind' }
    ],
    workedExample: {
      problem: 'Evaluate C(20, 18).',
      calculation: 'C(20, 18) = C(20, 2) = (20 * 19) / 2 = 190',
      result: '190'
    },
    practiceQuestion: {
      question: 'What is the value of C(15, 14)?',
      options: ['15', '1', '14', '105'],
      correctIndex: 0,
      explanation: 'C(15, 14) = C(15, 1) = 15.'
    }
  },
  {
    id: 'f-pigeonhole',
    name: 'Pigeonhole Principle (Generalized)',
    category: 'Theorems & Principles',
    latex: '\\text{Guaranteed max occupancy } \\ge \\left\\lceil \\frac{N}{k} \\right\\rceil',
    whenToUse: 'Use to guarantee duplicate birthdays, hash collisions, or minimum elements sharing a property.',
    variables: [
      { symbol: 'N', description: 'Number of items (pigeons)' },
      { symbol: 'k', description: 'Number of pigeonholes / containers' },
      { symbol: '⌈ ⌉', description: 'Ceiling function: rounding up to nearest integer' }
    ],
    workedExample: {
      problem: 'If 85 students sit in 8 lecture halls, what is the guaranteed minimum in the fullest hall?',
      calculation: 'ceil(85 / 8) = ceil(10.625) = 11',
      result: '11 students'
    },
    practiceQuestion: {
      question: 'What is the minimum number of students needed to guarantee at least 4 were born in the same calendar month?',
      options: ['37', '48', '36', '49'],
      correctIndex: 0,
      explanation: 'k = 12 months. Formula: k*(m - 1) + 1 = 12*(4 - 1) + 1 = 37 students.'
    }
  },
  {
    id: 'f-binomial-thm',
    name: 'Binomial Theorem',
    category: 'Theorems & Principles',
    latex: '(x+y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k',
    whenToUse: 'Use to expand powers of binomials and determine specific polynomial coefficients.',
    variables: [
      { symbol: 'n', description: 'Non-negative integer power' },
      { symbol: 'C(n,k)', description: 'Binomial coefficient of the (k+1)-th term' },
      { symbol: 'x, y', description: 'Terms of the binomial' }
    ],
    workedExample: {
      problem: 'Expand (x + 1)^3.',
      calculation: '1*x^3 + 3*x^2(1) + 3*x(1^2) + 1*(1^3) = x^3 + 3x^2 + 3x + 1',
      result: 'x^3 + 3x^2 + 3x + 1'
    },
    practiceQuestion: {
      question: 'What is the coefficient of x^3 y in the expansion of (x + y)^4?',
      options: ['4', '6', '1', '12'],
      correctIndex: 0,
      explanation: 'C(4, 1) = 4.'
    }
  },
  {
    id: 'f-pie-2',
    name: 'Inclusion-Exclusion (2 Sets)',
    category: 'Theorems & Principles',
    latex: '|A \\cup B| = |A| + |B| - |A \\cap B|',
    whenToUse: 'Use to count the union of two overlapping groups without double-counting shared elements.',
    variables: [
      { symbol: '|A|', description: 'Size of set A' },
      { symbol: '|B|', description: 'Size of set B' },
      { symbol: '|A ∩ B|', description: 'Elements belonging to both A and B' }
    ],
    workedExample: {
      problem: 'In a class of 40 students, 25 take Math, 20 take Physics, and 10 take both. How many take at least one?',
      calculation: '25 + 20 - 10 = 35',
      result: '35 students'
    },
    practiceQuestion: {
      question: 'If |A| = 30, |B| = 20, and |A ∪ B| = 42, what is |A ∩ B|?',
      options: ['8', '10', '12', '50'],
      correctIndex: 0,
      explanation: '|A ∩ B| = |A| + |B| - |A ∪ B| = 30 + 20 - 42 = 8.'
    }
  },
  {
    id: 'f-pie-3',
    name: 'Inclusion-Exclusion (3 Sets)',
    category: 'Theorems & Principles',
    latex: '|A \\cup B \\cup C| = (|A| + |B| + |C|) - (|A \\cap B| + |A \\cap C| + |B \\cap C|) + |A \\cap B \\cap C|',
    whenToUse: 'Use to calculate union of three overlapping sets.',
    variables: [
      { symbol: 'Σ|A|', description: 'Sum of individual cardinalities' },
      { symbol: 'Σ|A ∩ B|', description: 'Sum of pairwise intersections (subtracted)' },
      { symbol: '|A ∩ B ∩ C|', description: 'Triple intersection (added back)' }
    ],
    workedExample: {
      problem: '|A|=10, |B|=10, |C|=10; pairwise intersections are each 3; triple intersection is 1. Find |A ∪ B ∪ C|.',
      calculation: '(10 + 10 + 10) - (3 + 3 + 3) + 1 = 30 - 9 + 1 = 22',
      result: '22'
    },
    practiceQuestion: {
      question: 'What is the sign of the triple intersection in the 3-set Inclusion-Exclusion formula?',
      options: ['Positive (+)', 'Negative (-)', 'Multiplied by 2', 'Zero'],
      correctIndex: 0,
      explanation: 'The sign is positive (+), following the alternating sign rule (+, -, +).'
    }
  },
  {
    id: 'f-derangement',
    name: 'Derangement Formula (Subfactorial)',
    category: 'Theorems & Principles',
    latex: 'D(n) = !n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!} = n! \\left(1 - \\frac{1}{1!} + \\frac{1}{2!} - \\dots + \\frac{(-1)^n}{n!} \\right)',
    whenToUse: 'Use when finding permutations where NO element remains in its original position.',
    variables: [
      { symbol: 'D(n) or !n', description: 'Number of derangements of n distinct items' },
      { symbol: '(-1)^k / k!', description: 'Alternating series terms' }
    ],
    workedExample: {
      problem: 'Derangements of 3 items (letters into envelopes).',
      calculation: '3! * (1 - 1 + 1/2 - 1/6) = 6 * (2/6) = 2',
      result: '2 derangements'
    },
    practiceQuestion: {
      question: 'What is D(4)?',
      options: ['9', '8', '12', '24'],
      correctIndex: 0,
      explanation: 'D(4) = 4! * (1 - 1 + 1/2 - 1/6 + 1/24) = 24 * (9/24) = 9.'
    }
  },
  {
    id: 'f-multiset-perm',
    name: 'Multiset Permutations',
    category: 'Multisets',
    latex: 'N = \\frac{n!}{n_1! n_2! \\dots n_k!}',
    whenToUse: 'Use when arranging letters or objects with repeated identical elements (anagrams).',
    variables: [
      { symbol: 'n', description: 'Total count of all items (n = n1 + n2 + ... + nk)' },
      { symbol: 'n_i!', description: 'Factorial of the frequency of each repeated element' }
    ],
    workedExample: {
      problem: 'Arrangements of letters in the word "LEVEL" (L:2, E:2, V:1).',
      calculation: '5! / (2! * 2! * 1!) = 120 / 4 = 30',
      result: '30 anagrams'
    },
    practiceQuestion: {
      question: 'How many permutations exist for the letters of "PEPPER"?',
      options: ['60', '120', '30', '720'],
      correctIndex: 0,
      explanation: 'Total = 6 letters (P:3, E:2, R:1). 6! / (3! * 2! * 1!) = 720 / 12 = 60.'
    }
  },
  {
    id: 'f-stars-bars',
    name: 'Combinations with Repetition (Stars & Bars)',
    category: 'Multisets',
    latex: '\\binom{r + k - 1}{r} = \\binom{r + k - 1}{k - 1}',
    whenToUse: 'Use when selecting r items from k categories with unlimited repetition, or distributing r identical items to k recipients.',
    variables: [
      { symbol: 'r', description: 'Number of identical items to distribute or choose' },
      { symbol: 'k', description: 'Number of distinct categories/recipients' },
      { symbol: 'k - 1', description: 'Number of bar dividers required' }
    ],
    workedExample: {
      problem: 'Ways to select 5 donuts from 3 varieties (Chocolate, Glazed, Jelly).',
      calculation: 'C(5 + 3 - 1, 5) = C(7, 5) = C(7, 2) = (7 * 6) / 2 = 21',
      result: '21 ways'
    },
    practiceQuestion: {
      question: 'How many non-negative integer solutions exist for a + b + c = 4?',
      options: ['15', '12', '10', '21'],
      correctIndex: 0,
      explanation: 'r = 4, k = 3. C(4 + 3 - 1, 4) = C(6, 4) = C(6, 2) = 15.'
    }
  },
  {
    id: 'f-compositions',
    name: 'Total Compositions of an Integer',
    category: 'Partitions',
    latex: '\\text{Compositions of } n = 2^{n-1}',
    whenToUse: 'Use when splitting an integer n into ordered positive integer parts.',
    variables: [
      { symbol: 'n', description: 'Positive integer being decomposed' },
      { symbol: '2^{n-1}', description: 'Binary choices for the n-1 interior plus positions' }
    ],
    workedExample: {
      problem: 'Find the total compositions of n = 4.',
      calculation: '2^(4 - 1) = 2^3 = 8',
      result: '8 compositions'
    },
    practiceQuestion: {
      question: 'How many compositions exist for the integer n = 6?',
      options: ['32', '64', '16', '11'],
      correctIndex: 0,
      explanation: '2^(6 - 1) = 2^5 = 32.'
    }
  },
  {
    id: 'f-fibonacci',
    name: 'Fibonacci Recurrence',
    category: 'Recurrence Relations',
    latex: 'F_n = F_{n-1} + F_{n-2} \\quad (F_0 = 0, \\; F_1 = 1)',
    whenToUse: 'Use to generate Fibonacci numbers, count domino tilings, and model binary string patterns without consecutive zeros.',
    variables: [
      { symbol: 'F_n', description: 'n-th Fibonacci number' },
      { symbol: 'F_{n-1}, F_{n-2}', description: 'Immediate previous two terms' }
    ],
    workedExample: {
      problem: 'Find F_5 given F_3 = 2 and F_4 = 3.',
      calculation: 'F_5 = F_4 + F_3 = 3 + 2 = 5',
      result: '5'
    },
    practiceQuestion: {
      question: 'What is F_7 in the standard Fibonacci sequence?',
      options: ['13', '8', '21', '14'],
      correctIndex: 0,
      explanation: '0, 1, 1, 2, 3, 5, 8, 13... F_7 = 13.'
    }
  },
  {
    id: 'f-hanoi',
    name: 'Towers of Hanoi Recurrence',
    category: 'Recurrence Relations',
    latex: 'T_n = 2 T_{n-1} + 1 \\implies T_n = 2^n - 1',
    whenToUse: 'Use for recursive divide-and-conquer puzzles and algorithmic operations.',
    variables: [
      { symbol: 'n', description: 'Number of disks' },
      { symbol: 'T_n', description: 'Minimum number of valid disk moves' }
    ],
    workedExample: {
      problem: 'Find minimum moves for 3 disks in Towers of Hanoi.',
      calculation: '2^3 - 1 = 8 - 1 = 7',
      result: '7 moves'
    },
    practiceQuestion: {
      question: 'How many moves are needed to solve Towers of Hanoi with 6 disks?',
      options: ['63', '64', '31', '127'],
      correctIndex: 0,
      explanation: '2^6 - 1 = 64 - 1 = 63 moves.'
    }
  }
];
