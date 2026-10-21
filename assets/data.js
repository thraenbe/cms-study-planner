// Shared data for the study organizer (Applied AI track, CMS at TU Dresden).
// Module texts: official module descriptions (goals/contents) and short summaries
// written from them. Sessions: faculty course catalogue for winter 2026/27, corrected
// with course pages where the catalogue had no times ("src": "course page").
// Sessions with start === null have no published time yet (day === null: no day either).
// "tentative": true = listed by the chair but not confirmed to apply to Bela.
// Date rules (the dashboard's week-by-week calendar, CMSUtil.occurrences): a session runs weekly on
// "day" from "from" to "to", minus the holidays and breaks in "term" (unless "duringBreaks": true) and
// the "skip" dates; "dates" lists its only dates instead. "extra" adds one-off dates
// ({ date, kind, start, end, room, label, tentative }; fields left out come from the session, start: null
// = all-day item such as a deadline); "labels" names single dates. Enrolled courses only list the group
// Bela is in; "toConfirm" holds sessions Bela will attend whose time isn't fixed yet (no group yet).
// Course pages: modules[code].course (key dates, grading, reading list) and modules[code].status
// ({ opal, selma } flags, Bela's own registration state) feed the per-course dashboards (touch-sensing.html, computer-vision.html).
// modules[code].noTimes replaces the "no session times yet" text on module.html for courses without sessions.
// Generated once by a script, now edited directly (last: 2026-10-21).
window.CMS = {
 "semester": "Winter 2026/27",
 "updated": "2026-10-21",
 "term": {
  "src": "https://tu-dresden.de/studium/im-studium/studienorganisation/studienjahresablauf",
  "start": "2026-10-01",
  "end": "2027-03-31",
  "periods": [
   {
    "from": "2026-10-12",
    "to": "2026-12-19",
    "kind": "lectures",
    "label": "Lecture period"
   },
   {
    "from": "2026-12-20",
    "to": "2027-01-03",
    "kind": "break",
    "label": "Christmas and New Year break",
    "note": "no lectures or exercises"
   },
   {
    "from": "2027-01-04",
    "to": "2027-02-06",
    "kind": "lectures",
    "label": "Lecture period"
   },
   {
    "from": "2027-02-08",
    "to": "2027-03-06",
    "kind": "exams",
    "label": "Main exam period",
    "note": "your exam dates aren't announced yet"
   }
  ],
  "holidays": [
   {
    "date": "2026-10-03",
    "label": "German Unity Day"
   },
   {
    "date": "2026-10-31",
    "label": "Reformation Day"
   },
   {
    "date": "2026-11-18",
    "label": "Buß- und Bettag"
   },
   {
    "date": "2027-03-26",
    "label": "Good Friday"
   },
   {
    "date": "2027-03-29",
    "label": "Easter Monday"
   }
  ]
 },
 "enrolled": [
  "CMS-COR-HPC",
  "CMS-COR-VIZ",
  "CMS-TRK-APSS",
  "CMS-TRK-CAI",
  "CMS-PRO",
  "CMS-TRK-DCD",
  "CMS-COR-SAP",
  "CMS-TRK-TSP"
 ],
 "toConfirm": [
  {
   "code": "CMS-COR-HPC",
   "kind": "Exercise",
   "text": "no exercise group yet; exercises start in the week of 26 Oct"
  }
 ],
 "toRegister": [
  "CMS-COR-SSE",
  "CMS-TRK-HWSWC"
 ],
 "opalStatus": {
  "CMS-COR-HPC": {
   "level": "bad",
   "text": "All three exercise groups are full (40/40, 30/30, 60/60); you're on the waiting list. Registration open until 15 Nov."
  },
  "CMS-TRK-CV": {
   "level": "info",
   "text": "Not in your schedule (dropped on 20 Oct in favour of the Conversational AI seminar); the OPAL enrolment (CV Group, Exercise Group 1) is untouched. Unenrol in OPAL if you want to free the place."
  },
  "CMS-TRK-DCD": {
   "level": "ok",
   "text": "Enrolled in the WS 26/27 student group of “Digital Circuit Technology / Digitale Schaltungstechnik”. Exercise sign-up isn't open in OPAL yet."
  },
  "CMS-TRK-MLSP": {
   "level": "info",
   "text": "Not in your schedule (dropped on 20 Oct); the OPAL enrolment in the group Winter Semester 2026/2027 is untouched (unenrolment possible until 31 Mar 2027)."
  },
  "CMS-TRK-CAI": {
   "level": "ok",
   "text": "Admitted from the waiting list on 20 Oct; you chose topic 1. Seminar Thursdays 11:10–12:40 in APB/E006/U (Charvi Jain). Register for the exam in Selma."
  },
  "CMS-COR-SAP": {
   "level": "ok",
   "text": "Enrolled in the winter 26/27 group “Students2026”. First lecture on 19 October 2026."
  },
  "CMS-TRK-APSS": {
   "level": "ok",
   "text": "In the course group and in tutorial group 2 (Fridays 13:00–14:30, APB/E006/U; first tutorial on 30 Oct)."
  },
  "CMS-COR-VIZ": {
   "level": "ok",
   "text": "Signed up for the course."
  },
  "CMS-PRO": {
   "level": "info",
   "text": "Your project comes from Michael Färber's group (allocation of 19 Oct), not from OPAL. You're still enrolled in the OPAL course “Research Projects Machine Learning (Computer Science) - Winter 26/27” of the Chair of Machine Learning for Computer Vision, which has nothing to do with it."
  },
  "CMS-TRK-TSP": {
   "level": "ok",
   "text": "In the OPAL course and its WiSe 26/27 group (Calandra, Koch). Enrolment/unenrolment open until 31 Oct."
  },
  "CMS-COR-ML": {
   "level": "ok",
   "text": "Enrolled in “Machine Learning 1 – Winter 2026/27” (380 of 500) and in exercise group 1 (Tuesday 16:40, POT/0081/H). Not in your schedule (dropped on 12 Oct); the OPAL enrolment is untouched."
  }
 },
 "opalChecked": "2026-10-15",
 "priorities": [
  {
   "id": "core3",
   "title": "Third basic professional training module",
   "options": [
    "CMS-COR-SAP",
    "CMS-COR-SSE"
   ],
   "why": "Basic professional training needs 3 modules; you have High-Performance Computing and Data Visualization.",
   "hint": "Stochastics and Probability is taught this winter (as “Stochastic Modeling and Simulation”); Scientific Software Engineering isn't in this winter's catalogue."
  },
  {
   "id": "dcd",
   "title": "Digital Circuit Design",
   "options": [
    "CMS-TRK-DCD"
   ],
   "why": "Required module of the Applied AI track."
  },
  {
   "id": "elective4",
   "title": "Fourth track elective",
   "options": [
    "CMS-TRK-MLSP",
    "CMS-TRK-CAI",
    "CMS-TRK-HWSWC"
   ],
   "why": "You have Problem Solving, Circuit and System Design and Conversational AI (Computer Vision and Machine Learning in Signal Processing dropped on 20 Oct).",
   "hint": "Hardware-Software Co-Design is only taught in summer, so this semester it's Machine Learning in Signal Processing or Conversational AI."
  }
 ],
 "sources": {
  "catalogue": "https://wwwdek.inf.tu-dresden.de/lv/en.html",
  "handbook": "https://tu-dresden.de/ing/informatik/ressourcen/dateien/cms/ordnungen-1/ModuleDescriptions_EN.pdf",
  "studyPlan": "https://tu-dresden.de/ing/informatik/ressourcen/dateien/cms/ordnungen-1/SAPL_EN_aktualisiert_update.pdf?lang=en",
  "opal": "https://bildungsportal.sachsen.de/opal/home"
 },
 "modules": {
  "CMS-COR-HPC": {
   "code": "CMS-COR-HPC",
   "name": "High-Performance Computing",
   "area": "Basic professional training",
   "group": "core",
   "planSem": 1,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "How supercomputers are built and programmed: parallel architectures, interconnection networks and the programming models used in supercomputing. You learn to judge which architecture suits which parallel algorithm and write simple parallel programs, drawing on practice from TU Dresden’s ZIH computing centre.",
   "coord": "Prof. Dr. Wolfgang Nagel",
   "freq": "Every winter semester",
   "exam": "Written exam, 90 min",
   "prereq": "Setting up computer systems, Unix command line, C programming",
   "lang": "German or English",
   "winter": {
    "who": "Dr. Robert Schöne, Markus Velten, Josef Weidendorfer (per OPAL); lecture listed under Prof. Dr. Wolfgang Nagel",
    "q": "High Performance Computing"
   },
   "goals": "Students will be able to describe strategies and methods of parallel processing in parallel computer architectures. They will be able to evaluate parallel architectures and network concepts and assess their suitability for various parallel algorithms. They will be able to develop simple parallel programs that utilize different types of parallelism.",
   "contents": "The module covers the fundamentals of high-performance computing and its programming, as well as strategies and methods of parallel processing, including programming models widely used in supercomputing. Additional content includes architecture and network concepts, as well as the necessary algorithmic building blocks, closely linked to practical experience from the interdisciplinary field of work at the CIDS Department ZIH—Information Services and high-performance computing.",
   "links": {
    "web": "https://tu-dresden.de/ing/informatik/ti/professur-fuer-rechnerarchitektur/studium/lehrveranstaltungen/vorlesungen/vorlesung-hochleistungsrechner-und-ihre-programmierung",
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/55582162944"
   },
   "note": "Late start: the lecture begins on 21 October, the exercises in the week of 26 October. Until then, students without a computer-science background should check the prerequisites in OPAL: the computer-architecture video (Lectures → videos from previous semesters) and the Linux and C self-tests (Exercises). Slides and exercise sheets are in OPAL.",
   "schedule": {
    "src": "OPAL",
    "rows": [
     [
      "2026-10-14",
      "No lecture (late start; the Introduction is skipped or merged)"
     ],
     [
      "2026-10-21",
      "Basics of Parallelism (first lecture)"
     ],
     [
      "2026-10-28",
      "Batch Systems"
     ],
     [
      "2026-11-04",
      "Shared Memory: Parallelism within a Processor and on a Compute Node"
     ],
     [
      "2026-11-11",
      "Shared Memory Programming 1: Threads"
     ],
     [
      "2026-11-18",
      "No lecture (Buß- und Bettag)"
     ],
     [
      "2026-11-25",
      "Shared Memory Programming 2: SIMD & Dependencies"
     ],
     [
      "2026-12-02",
      "Distributed Memory: Networks"
     ],
     [
      "2026-12-09",
      "Distributed Memory Programming: MPI"
     ],
     [
      "2026-12-16",
      "Distributed Memory Programming: PGAS and Data Layout"
     ],
     [
      "2027-01-06",
      "Accelerators"
     ],
     [
      "2027-01-13",
      "Accelerator Programming: CUDA, OpenACC, and OpenMP"
     ],
     [
      "2027-01-20",
      "Performance Analysis"
     ],
     [
      "2027-01-27",
      "Load Balance, Power, and Energy"
     ],
     [
      "2027-02-03",
      "Summary, Outlook and Questions"
     ]
    ]
   }
  },
  "CMS-COR-ML": {
   "code": "CMS-COR-ML",
   "name": "Machine Learning",
   "area": "Basic professional training",
   "group": "core",
   "planSem": 1,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "Machine learning formulated as mathematical optimization: supervised, semi-supervised, unsupervised and structured learning, and how hard these problems are. Covers decision trees, logistic regression, neural networks and backpropagation, correlation clustering, and inference in graphical models with message passing.",
   "coord": "Prof. Dr. Björn Andres",
   "freq": "Every winter semester",
   "exam": "Written exam, 90 min",
   "prereq": "Algorithms, theoretical computer science, analysis, linear algebra, probability and statistics",
   "winter": {
    "who": "Prof. Dr. Björn Andres (as “Machine Learning I”)",
    "q": "CMS-COR-ML"
   },
   "goals": "Students will be familiar with the problems of supervised, semi-supervised, unsupervised, and structural machine learning as formulated as mathematical optimization problems. They will understand the complexity of these problems and be able to prove this complexity themselves using methods from theoretical computer science. They are familiar with efficient local search algorithms for learning decision trees, logistic regression, correlation clustering, linear ordering, as well as for inference and learning in graphical models with factor graphs, and are able to implement and apply these algorithms themselves. Students are familiar with the structure of simple artificial neural networks as well as the forward and backward propagation algorithms, and are able to implement and apply these algorithms on their own. They can present research findings in English.",
   "contents": "The module covers supervised machine learning as an optimization problem, regularized risk minimization, decision tree learning, logistic regression, neural networks, and the fundamentals of supervised deep learning, forward and backward propagation algorithms, semi-supervised and unsupervised machine learning as optimization problems, classification with more than two classes, correlation clustering, linear ordering, structural machine learning as an optimization problem, graphical models, factor graphs, the Gibbs distribution, and message-passing algorithms.",
   "links": {
    "web": "https://mlcv.cs.tu-dresden.de/courses/26-winter/ml1/index.html",
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/56370987016"
   },
   "note": "Exercise groups start 20 Oct 2026; you're in group 1 (Tuesday 16:40–18:10, POT/0081/H). Group 2 is Thursday 14:50–16:20 (BAR/SCHÖ/E). The lecture (Friday 9:20) overlaps ML in Signal Processing."
  },
  "CMS-COR-NUM": {
   "code": "CMS-COR-NUM",
   "name": "Basic Numerical Methods",
   "area": "Basic professional training",
   "group": "core",
   "planSem": 1,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "The fundamentals of numerical mathematics: floating-point arithmetic and rounding errors, interpolation, solving linear and nonlinear systems, numerical integration and time stepping, and the stability of these methods. It ends with the basics of numerical methods for partial differential equations.",
   "coord": "Not named in the module description",
   "freq": "Every winter semester",
   "exam": "Written exam, 90 min",
   "prereq": "Programming, algorithms, analysis, linear algebra, probability and statistics",
   "goals": "Upon completion of the module, students will have mastered the fundamentals of numerical mathematics and numerical simulation methods. They will have a theoretical understanding of how a computer performs calculations using finite-precision floating-point numbers, the errors and inaccuracies that can arise in the process, and how to mitigate and control these. They will be familiar with fundamental numerical methods for solving and simulating mathematical models, models in linear algebra, and ordinary and partial differential equations. They will be able to estimate the approximation errors of these methods and determine their computational complexity, and will be capable of implementing the methods themselves, adapting them to specific applications, and optimizing them.",
   "contents": "The module covers floating-point arithmetic, rounding errors, cancellation, numerical interpolation using the Lagrange, Newton, Aitken-Neville, Hermite, and spline methods, numerical solution of linear and nonlinear equations and systems of equations, Taylor series expansions, finite differences and their approximation errors, explicit and implicit time integrators, numerical stability, direct and iterative algorithms for matrix inversion, numerical integration, discrete Fourier transforms, matrix decomposition, solvers for the Poisson equation, and fundamentals of numerical methods for partial differential equations.",
   "links": {
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/32365445133"
   },
   "note": "The OPAL course (Gopan, Sbalzarini; RepositoryEntry 32365445133) still shows winter 2025/26 with a “Students2025” enrolment group; last winter it ran Mondays 14:50 (lecture) and Thursdays 11:10 (exercise) in BEY/0127/H. Check again for a 2026/27 enrolment group."
  },
  "CMS-COR-SAP": {
   "code": "CMS-COR-SAP",
   "name": "Stochastics and Probability",
   "area": "Basic professional training",
   "group": "core",
   "planSem": 1,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "Stochastic modelling and simulation: probability distributions, random number generation, Markov chains, Monte Carlo and Markov chain Monte Carlo methods, Brownian motion and stochastic differential equations. You implement stochastic algorithms yourself.",
   "coord": "Not named in the module description",
   "freq": "Every winter semester",
   "exam": "Written exam, 90 min",
   "prereq": "Programming, algorithms, analysis, linear algebra, probability and statistics",
   "winter": {
    "who": "Dr. Nandu Gopan (as “Stochastic Modeling and Simulation”)",
    "q": "Stochastic Modeling and Simulation"
   },
   "goals": "Upon completion of the module, students will have mastered the fundamentals of stochastic modeling and simulation. They will be able to independently implement stochastic algorithms and formulate new ones.",
   "contents": "The module covers conditional probabilities, normal distributions and scale-free distributions, transformation of random variables, simulation of pseudo- and quasi-random numbers, Markov chains and their matrix representation, mixing times, Monte Carlo methods—in particular convergence, the law of large numbers, variance reduction, Rao-Blackwell, Importance sampling, Markov chain Monte Carlo using Metropolis-Hastings and Gibbs samplers, random processes and Brownian motion—in particular, properties in 1, 2, 3, and more dimensions—connection to the diffusion equation, stochastic differential equations—in particular, nonlinear transformations of Brownian motion, Ito calculus, Ornstein-Uhlenbeck process, and other solvable equations, numerical simulation of stochastic differential equations, in particular strong and weak error estimates, Euler-Maruyama scheme, Milstein scheme, stochastic optimization algorithms, and exact stochastic simulation algorithms for reaction networks.",
   "links": {
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/32365445134"
   },
   "opalText": "This course enable the students to master the basics of stochastic modelling and simulation. The course first discusses discrete-time models, followed by two classic examples, and then goes on to discuss continuous-time models.",
   "note": "Taught this winter as “Stochastic Modeling and Simulation” (Dr. Nandu Gopan); the faculty catalogue lists it under CMS-COR-SAP. First lecture 19 October 2026; per the catalogue, lecture Mondays (SCH/A117/H) and exercise Thursdays (BEY/0E39/U), times not yet published. Register for the exam in Selma."
  },
  "CMS-COR-SSE": {
   "code": "CMS-COR-SSE",
   "name": "Scientific Software Engineering",
   "area": "Basic professional training",
   "group": "core",
   "planSem": 1,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "Designing large object-oriented software for scientific computing: classic design patterns in UML and code, reusable components and frameworks, and role-based modelling.",
   "coord": "Prof. Dr. Uwe Aßmann",
   "freq": "Every winter semester",
   "exam": "Oral exam, 15 min (exercises earn a bonus)",
   "prereq": "Object-oriented programming (Java, C#, Python, C++), UML",
   "goals": "Students will master fundamental methods, design elements, and notations for the systematic modeling, design, and development of large object-oriented software systems for scientific computing, with particular emphasis on the reuse of classes and frameworks, the use of design patterns, and the underlying principles of role-based modeling. They will be able to contribute to the design and development of large software systems in accordance with the current state of the art and apply these systems in practical scenarios.",
   "contents": "The module covers classic design patterns in UML and programming languages for the variability, extensibility, and reuse of components and software frameworks.",
   "links": {},
   "register": "Not in this winter's faculty catalogue under this name or module number. Its content (design patterns and frameworks, Prof. Aßmann's chair) matches the course “Design Patterns and Frameworks”; ask the study office whether that course counts as CMS-COR-SSE before registering."
  },
  "CMS-COR-VIZ": {
   "code": "CMS-COR-VIZ",
   "name": "Data Visualization",
   "area": "Basic professional training",
   "group": "core",
   "planSem": 1,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "How to turn measurement, experimental and simulation data into effective visualizations. Covers human visual perception, mapping data types to visual attributes, and the main techniques for 2D, 3D and multidimensional data, including scalar, vector and tensor fields.",
   "coord": "Prof. Dr. Stefan Gumhold",
   "freq": "Every winter semester",
   "exam": "Written exam, 90 min",
   "prereq": "Programming, algorithms, analysis, basic data analysis, linear algebra",
   "winter": {
    "who": "Prof. Dr. Raimund Dachselt, Prof. Dr. Stefan Gumhold",
    "q": "Data Visualization"
   },
   "goals": "Students will master the fundamentals and practices of scientific visualization of measurement and experimental data as well as simulation results. They will understand the fundamentals of visual perception and its influence on the design of visualizations. Students will be able to confidently specify data by dimension, feature types, and structure, and select appropriate visual attributes for a given specification. They are familiar with the most important forms of visualization for two-, three-, and multidimensional observation spaces, as well as for scalar, vector, tensor, and multidimensional feature values. They are able to select appropriate techniques for the respective visualization task. Students are familiar with basic presentation and interaction techniques and can implement them at a fundamental level in an interactive visual analysis system. They are familiar with the most important visualization frameworks, have gained practical experience with them, and are able to select them appropriately for the task at hand.",
   "contents": "The module covers the fundamentals of data visualization, focusing on the representation of different types of data as visual attributes and insights into human visual perception.",
   "links": {
    "web": "https://mt.inf.tu-dresden.de/lehre/datavis",
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/56176246787"
   },
   "note": "The exercises aren't graded and give no exam bonus, but the exam includes questions about them. Lectures every Wednesday from 14 October. Exercises run only on six Wednesdays (the room is shared with User Interface Engineering). No session on 18 November (Buß- und Bettag) or 20 December – 3 January. Enrolment in OPAL and for the exam in Selma is open until 15 December 2026.",
   "schedule": {
    "src": "course page",
    "lab": true,
    "rows": [
     [
      "2026-10-14",
      "Introduction",
      "Introduction and E1: Dear Data"
     ],
     [
      "2026-10-21",
      "Visual Variables",
      ""
     ],
     [
      "2026-10-28",
      "Perception",
      ""
     ],
     [
      "2026-11-04",
      "Multivariate Data Visualization 1",
      "E2: Multivariate Data"
     ],
     [
      "2026-11-11",
      "Multivariate Data Visualization 2",
      ""
     ],
     [
      "2026-11-18",
      "No lecture or exercise (Buß- und Bettag)",
      ""
     ],
     [
      "2026-11-25",
      "Visualizing Relations",
      ""
     ],
     [
      "2026-12-02",
      "Presentation & Interaction 1",
      "E3: Networks"
     ],
     [
      "2026-12-09",
      "Presentation & Interaction 2",
      "E4: Elevation Data; [optional] Time Visualization"
     ],
     [
      "2026-12-16",
      "Introduction to Scientific Visualization",
      ""
     ],
     [
      "2027-01-06",
      "Data Preparation",
      "E5: Volume Data"
     ],
     [
      "2027-01-13",
      "Volume Visualization 1",
      ""
     ],
     [
      "2027-01-20",
      "Volume Visualization 2",
      ""
     ],
     [
      "2027-01-27",
      "Flow Visualization 1",
      "Closing"
     ],
     [
      "2027-02-03",
      "Flow Visualization 2 + Summary & Outlook",
      ""
     ]
    ]
   }
  },
  "CMS-TRK-DCD": {
   "code": "CMS-TRK-DCD",
   "name": "Digital Circuit Design",
   "area": "AAI track · required",
   "group": "trkreq",
   "planSem": 1,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "How digital circuits work and how to design them, from CMOS gates and flip-flops up to ALUs, multipliers, finite-state machines and memory architectures such as DRAM and SRAM. It also covers mixed-signal parts like ADCs and DACs, and techniques for cutting power and raising speed in nanoscale CMOS.",
   "coord": "Prof. Dr. Christian Georg Mayr",
   "freq": "Every winter semester",
   "exam": "Written exam, 120 min",
   "prereq": "Bachelor-level electrical engineering, systems theory and mathematics",
   "winter": {
    "who": "Prof. Dr. Christian Georg Mayr",
    "q": "CMS-TRK-DCD"
   },
   "goals": "Students will understand the functioning and fundamental design principles of digital circuits. Building on their knowledge of active semiconductor device models, they will learn the systematic design and analysis of basic digital and mixed-signal circuits. They understand the architectural and system concepts of complex digital systems and are familiar with the circuit-level characteristics of nanoscale CMOS technologies, methods for reducing power dissipation, measures to increase processing speed in high-speed circuits and interfaces, and the consideration of statistical effects of manufacturing technologies.",
   "contents": "The module covers the analysis, sizing, and optimization of basic digital combinational and sequential elements based on current semiconductor technologies, such as CMOS and BiCMOS; the design of complex logic functions in the form of arithmetic-logic circuits, such as ALUs, shifters and multipliers; finite-state machines; flip-flop and oscillator circuits; digital architecture and system concepts such as register-transfer logic, memory architectures—in particular DRAM, SRAM, EPROM, and mixed-signal circuits, such as ADCs, DACs, and interfaces, as well as methodologies for designing complex digital and mixed-signal systems, such as behavioral description, optimization, and validation.",
   "links": {
    "web": "https://tu-dresden.de/ing/elektrotechnik/iee/hpsn/studium/lehrveranstaltungen/zeitplan_ws",
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/26351140878"
   },
   "note": "Lecture Mondays 4th DS (13:00–14:30) in TOE/317/H from 12 Oct. You attend the Thursday exercise, 2nd DS (9:20–10:50) in BAR/0E85/U (+ TOE/203), every first week (odd calendar weeks) from 22 Oct; the chair's timetable lists it for the EuI Diplom variant. The CMS exercise (CMS-AAI-DCT) runs weekly on Wednesdays, 2nd DS, in APB/E008/U. Sign up for the exercises in OPAL. Register for the exam in Selma.",
   "status": {
    "opal": true,
    "selma": false
   },
   "schedule": {
    "src": "lecture topics and order from the chair's slide list (materials page, 2022/23 decks), one deck per lecture Monday assumed; dates from the chair's WS 2026/27 timetable (20 Oct 2026; Thursday exercise in odd calendar weeks) and the TU Dresden academic calendar; exercise topics not published yet",
    "rows": [
     [
      "2026-10-12",
      "Lecture 1: Introduction and digital basics",
      "lec"
     ],
     [
      "2026-10-19",
      "Lecture 2: Arithmetic circuits 1",
      "lec"
     ],
     [
      "2026-10-22",
      "Exercise 1 (Thursday group)",
      "exe"
     ],
     [
      "2026-10-26",
      "Lecture 3: Arithmetic circuits 2",
      "lec"
     ],
     [
      "2026-11-02",
      "Lecture 4: Arithmetic circuits 3",
      "lec"
     ],
     [
      "2026-11-05",
      "Exercise 2 (Thursday group)",
      "exe"
     ],
     [
      "2026-11-09",
      "Lecture 5: Semiconductor technology for digital circuits",
      "lec"
     ],
     [
      "2026-11-16",
      "Lecture 6: CMOS logic 1",
      "lec"
     ],
     [
      "2026-11-19",
      "Exercise 3 (Thursday group)",
      "exe"
     ],
     [
      "2026-11-23",
      "Lecture 7: Timing of CMOS logic",
      "lec"
     ],
     [
      "2026-11-30",
      "Lecture 8: Power and energy in digital circuits",
      "lec"
     ],
     [
      "2026-12-03",
      "Exercise 4 (Thursday group)",
      "exe"
     ],
     [
      "2026-12-07",
      "Lecture 9: Mixed-signal circuits 1",
      "lec"
     ],
     [
      "2026-12-14",
      "Lecture 10: Mixed-signal circuits 2",
      "lec"
     ],
     [
      "2026-12-17",
      "Exercise 5 (Thursday group)",
      "exe"
     ],
     [
      "2026-12-21",
      "Christmas break until 3 Jan (no lectures or exercises)",
      "off"
     ],
     [
      "2027-01-04",
      "Lecture 11: Logic 2: programmable logic",
      "lec"
     ],
     [
      "2027-01-07",
      "Exercise 6 (Thursday group)",
      "exe"
     ],
     [
      "2027-01-11",
      "Lecture 12: Memory circuits",
      "lec"
     ],
     [
      "2027-01-18",
      "Lecture 13: I/O circuits",
      "lec"
     ],
     [
      "2027-01-21",
      "Exercise 7 (Thursday group)",
      "exe"
     ],
     [
      "2027-01-25",
      "Lecture 14: Hardware for deep neural networks",
      "lec"
     ],
     [
      "2027-02-01",
      "Reserve Monday (the 2022 plan had a lab tour and an 'advanced circuits' lecture here; not announced)",
      "off"
     ],
     [
      "2027-02-04",
      "Exercise 8 (Thursday group)",
      "exe"
     ]
    ]
   },
   "course": {
    "page": "digital-circuit-design.html",
    "rooms": {
     "lecture": "TOE/317/H (Mon 13:00–14:30, 4th DS)",
     "exercise": "BAR/0E85/U (Thu 9:20–10:50, 2nd DS, every other week)"
    },
    "keyDates": [
     {
      "date": "2026-10-12",
      "label": "First lecture (Introduction)",
      "kind": "lecture"
     },
     {
      "date": "2026-10-16",
      "label": "OPAL enrolment / unenrolment closes (00:00)",
      "kind": "deadline"
     },
     {
      "date": "2026-10-22",
      "label": "First Thursday exercise",
      "kind": "exercise"
     },
     {
      "date": "2026-12-21",
      "label": "Christmas break until 3 Jan",
      "kind": "break"
     },
     {
      "date": "2027-01-25",
      "label": "Last titled lecture (DNN hardware)",
      "kind": "lecture"
     },
     {
      "date": "2027-02-04",
      "label": "Last exercise",
      "kind": "exercise"
     },
     {
      "date": "2027-02-08",
      "label": "Exam period starts (8 Feb – 6 Mar); exam date not announced",
      "kind": "deadline"
     }
    ],
    "grading": [
     {
      "variant": "CMS-AAI-DCT / CMS-TRK-DCD (CMS, Applied AI track)",
      "how": "Written exam, 120 min; the module grade is the exam grade",
      "selma": "registration period not announced yet"
     },
     {
      "variant": "EuI-ET-C-ADST (Diplom Informationssystemtechnik)",
      "how": "Combined written exam, 150 min; 1 SWS exercise instead of 2",
      "selma": "not Bela’s variant"
     }
    ],
    "selmaNote": "registration period not announced yet",
    "format": "2 SWS lecture + 2 SWS exercise (CMS variant), 5 LP, 150 h workload. Slides in English; lecture, exercise and board notes in German (as announced on the 2022 slides). No formal prerequisites for CMS students.",
    "contact": "Prof. Christian Mayr (christian.mayr@tu-dresden.de, TOE 214) for the lecture; Dr.-Ing. Johannes Partzsch and Dipl.-Ing. Jörg Schreiter run the exercises; questions also go to the OPAL forum",
    "materials": "https://tu-dresden.de/ing/elektrotechnik/iee/hpsn/studium/materialien/digitale-schaltungstechnik-vorlesung",
    "materialsNote": "14 slide decks (2022/23 versions) behind a password that is announced in the first lecture; the OPAL course only links here and hosts enrolment and the forum.",
    "coursePage": "https://tu-dresden.de/ing/elektrotechnik/iee/hpsn/studium/lehrveranstaltungen/dst",
    "reading": [
     {
      "t": "CMOS: Circuit Design, Layout, and Simulation",
      "a": "R. Jacob Baker",
      "y": 2011,
      "v": "IEEE Press, 3rd ed."
     },
     {
      "t": "Halbleiter-Schaltungstechnik",
      "a": "Ulrich Tietze & Christoph Schenk",
      "y": 2002,
      "v": "Springer"
     },
     {
      "t": "Digital Design and Computer Architecture",
      "a": "David Harris & Sarah Harris",
      "y": 2010,
      "v": "Morgan Kaufmann"
     }
    ],
    "lectures": [
     {
      "n": 1,
      "title": "Introduction and digital basics",
      "date": "2026-10-12",
      "icon": "🧭",
      "covered": true,
      "blurb": "Why digital wins: abstraction and scaling, analog vs digital, Boolean algebra, Karnaugh maps, binary arithmetic, latches and finite-state machines."
     },
     {
      "n": 2,
      "title": "Arithmetic circuits 1",
      "date": "2026-10-19",
      "icon": "➕",
      "covered": false,
      "blurb": "Number representations (unsigned, signed, fixed and floating point), addition and subtraction circuits."
     },
     {
      "n": 3,
      "title": "Arithmetic circuits 2",
      "date": "2026-10-26",
      "icon": "✖️",
      "covered": false,
      "blurb": "Adding multiple operands, multipliers and sequential multiplication; carry delays of ripple-carry vs carry-lookahead adders."
     },
     {
      "n": 4,
      "title": "Arithmetic circuits 3",
      "date": "2026-11-02",
      "icon": "➗",
      "covered": false,
      "blurb": "Division circuits, then the advanced blocks: filters, the ALU and floating-point operations."
     },
     {
      "n": 5,
      "title": "Semiconductor technology for digital circuits",
      "date": "2026-11-09",
      "icon": "🔬",
      "covered": false,
      "blurb": "Lithography-based CMOS manufacturing, the bulk CMOS cross section, devices and the 22 nm FDSOI prototype of the chair."
     },
     {
      "n": 6,
      "title": "CMOS logic 1",
      "date": "2026-11-16",
      "icon": "🔀",
      "covered": false,
      "blurb": "The CMOS inverter, transistor switch models, pull-up and pull-down networks, static characteristics and sizing."
     },
     {
      "n": 7,
      "title": "Timing of CMOS logic",
      "date": "2026-11-23",
      "icon": "⏱️",
      "covered": false,
      "blurb": "MOS capacitances, the RC switch model, effective resistance, gate delays, setup and hold in synchronous circuits."
     },
     {
      "n": 8,
      "title": "Power and energy in digital circuits",
      "date": "2026-11-30",
      "icon": "🔋",
      "covered": false,
      "blurb": "Where the energy goes: dynamic and static power, supply networks, and why keyword spotting must run below 10 µW."
     },
     {
      "n": 9,
      "title": "Mixed-signal circuits 1",
      "date": "2026-12-07",
      "icon": "🎚️",
      "covered": false,
      "blurb": "ADC types and characteristics, DAC types, with 1000BASE-T1 Ethernet as the running example."
     },
     {
      "n": 10,
      "title": "Mixed-signal circuits 2",
      "date": "2026-12-14",
      "icon": "📡",
      "covered": false,
      "blurb": "Digitally assisted analog, line drivers for wired communication, PLLs and DLLs, built-in self-test and calibration."
     },
     {
      "n": 11,
      "title": "Logic 2: programmable logic",
      "date": "2027-01-04",
      "icon": "🧩",
      "covered": false,
      "blurb": "Hardware vs software trade-offs, PLA and PAL, CPLDs and FPGAs: fast operation that is still quick to change."
     },
     {
      "n": 12,
      "title": "Memory circuits",
      "date": "2027-01-11",
      "icon": "💾",
      "covered": false,
      "blurb": "Flash, DRAM and SRAM: cell structures, arrays, embedded vs specific silicon technologies."
     },
     {
      "n": 13,
      "title": "I/O circuits",
      "date": "2027-01-18",
      "icon": "🔌",
      "covered": false,
      "blurb": "Why pads need their own circuitry: drivers, level shifters, ESD protection and high-speed interfaces."
     },
     {
      "n": 14,
      "title": "Hardware for deep neural networks",
      "date": "2027-01-25",
      "icon": "🧠",
      "covered": false,
      "blurb": "Why DNNs need special hardware: data flows, accelerators and the energy of a multiply-accumulate."
     }
    ]
   }
  },
  "CMS-TRK-CV": {
   "code": "CMS-TRK-CV",
   "name": "Computer Vision",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 1,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "The mathematical core of computer vision: image operators, color spaces, and image classification with neural and convolutional networks, including forward and backward propagation. Segmentation, object detection and tracking are each framed as optimization problems and solved with local search algorithms you implement yourself.",
   "coord": "Prof. Dr. Björn Andres",
   "freq": "Every winter semester",
   "exam": "Written exam, 90 min",
   "prereq": "Algorithms, theoretical computer science, analysis, linear algebra, probability and statistics",
   "winter": {
    "who": "Prof. Dr. Björn Andres (as “Computer Vision I”)",
    "q": "CMS-TRK-CV"
   },
   "goals": "Students will become familiar with basic linear and nonlinear operators used in image analysis and will be able to implement and apply them independently. They will understand the problems of image classification, image segmentation, object detection, and object tracking in their mathematical formulations. They will be familiar with local search algorithms for these problems and will be able to implement them independently and apply them to image data. Students are familiar with and understand the mathematical concepts of artificial neural networks and convolutional networks. They are familiar with and understand the forward and backward propagation algorithms used in machine learning for deep artificial neural networks and are able to apply these algorithms to the problem of image classification. They can present subject-specific results in English.",
   "contents": "The module covers color spaces, elementary linear and nonlinear operators in image analysis, the problem of image classification, artificial neural networks, convolutional networks, forward and backward propagation algorithms, image segmentation as an optimization problem, local search algorithms for image segmentation, object detection as an optimization problem, local search algorithms for object detection, object tracking as an optimization problem, and local search algorithms for object tracking.",
   "links": {
    "web": "https://mlcv.cs.tu-dresden.de/courses/26-winter/cv1/index.html",
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/56313610253"
   },
   "note": "Pick one of the two exercise groups in OPAL (“Registration Exercise”); Bela is in group 1 (Tue 13:00, SCH/A251). OPAL registration is open until 31 Jan 2027. Register for the written exam in Selma (period not announced yet).",
   "course": {
    "page": "computer-vision.html",
    "team": {
     "lecturer": "Prof. Björn Andres",
     "ta": "David Stein",
     "opal": "David Stein, Jannik Presberger, Björn Andres"
    },
    "rooms": {
     "lecture": "HSZ/AUDI/H (Mon 11:10–12:40)",
     "exercise": "SCH/A251 (Tue 13:00–14:30, group 1 — Bela's)",
     "exerciseB": "HSZ/0002/E (Thu 13:00–14:30, group 2)"
    },
    "navigator": {
     "HSZ/AUDI/H": "https://navigator.tu-dresden.de/raum/136101.0400",
     "SCH/A251": "https://navigator.tu-dresden.de/raum/145803.0990",
     "HSZ/0002/E": "https://navigator.tu-dresden.de/raum/1361-1.0400"
    },
    "keyDates": [
     {
      "date": "2026-10-12",
      "label": "First lecture (operators on digital images)",
      "kind": "lecture"
     },
     {
      "date": "2026-10-13",
      "label": "First exercise, group 1 (date assumed, see note)",
      "kind": "exercise"
     },
     {
      "date": "2026-12-19",
      "label": "Christmas break starts (20 Dec – 3 Jan)",
      "kind": "deadline"
     },
     {
      "date": "2027-01-04",
      "label": "Lectures resume",
      "kind": "lecture"
     },
     {
      "date": "2027-01-31",
      "label": "OPAL course registration closes",
      "kind": "deadline"
     },
     {
      "date": "2027-02-01",
      "label": "Last lecture",
      "kind": "lecture"
     },
     {
      "date": "2027-02-02",
      "label": "Last exercise, group 1",
      "kind": "exercise"
     },
     {
      "date": "2027-02-08",
      "label": "Core exam period starts (8 Feb – 6 Mar); exam date not announced",
      "kind": "deadline"
     }
    ],
    "grading": [
     {
      "variant": "CMS-TRK-CV",
      "how": "Written exam, 90 min (module description)",
      "selma": "period not announced yet"
     }
    ],
    "format": "Lecture (2 h/week) + exercise group session (2 h/week) + self-study + final examination; course and exam in English. Taught as “Computer Vision 1” by the Chair of Machine Learning for Computer Vision.",
    "contact": "OPAL forum of the course (the lecturer answers there), or the chair: mlcv@tu-dresden.de",
    "selmaNote": "Registration period for the written exam not announced yet (nothing on OPAL or the course page as of 12 Oct 2026).",
    "exerciseNote": "OPAL still says “Exercises (start 14.10.25)”, which is last year's date; the first session of group 1 is assumed to be Tue 13 Oct 2026, the day after the first lecture, as it was last year.",
    "chapters": [
     {
      "t": "Introduction",
      "sub": [
       "Mathematical foundations",
       "Linear and integer optimization for computer vision"
      ]
     },
     {
      "t": "Operators on digital images",
      "sub": [
       "Digital images",
       "Point operators",
       "Linear operators, including convolution",
       "Non-linear operators, including edge and corner detection"
      ],
      "slides": "https://mlcv.cs.tu-dresden.de/courses/26-winter/cv1/01-operators.pdf",
      "held": "2026-10-12"
     },
     {
      "t": "Machine learning for computer vision",
      "sub": [
       "Logistic regression",
       "Deep learning for computer vision",
       "Attention and transformers for computer vision"
      ]
     },
     {
      "t": "Classification of digital images",
      "sub": [
       "Classification of digital images and image patches",
       "Supervised learning problems and inference problems"
      ]
     },
     {
      "t": "Segmentation of digital images",
      "sub": [
       "Image segmentation",
       "Semantic segmentation"
      ]
     },
     {
      "t": "Object recognition in digital images",
      "sub": [
       "Single object recognition",
       "Multiple object recognition"
      ]
     },
     {
      "t": "Object tracking in digital images",
      "sub": [
       "Single object tracking",
       "Multiple object tracking"
      ]
     },
     {
      "t": "Embedding of digital images",
      "sub": [
       "Principal component analysis",
       "Auto-encoders",
       "Variational auto-encoders"
      ]
     }
    ],
    "lectures": [
     {
      "n": 1,
      "title": "Operators on digital images",
      "date": "2026-10-12",
      "icon": "🖼️",
      "blurb": "Digital images as maps on a pixel grid; point, linear and non-linear operators from gamma and histogram equalisation to convolution, morphology, Canny edges and Harris corners.",
      "covered": true,
      "slides": "https://mlcv.cs.tu-dresden.de/courses/26-winter/cv1/01-operators.pdf"
     },
     {
      "n": 2,
      "title": "Topic to be announced",
      "date": "2026-10-19",
      "icon": "📐",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 3,
      "title": "Topic to be announced",
      "date": "2026-10-26",
      "icon": "🧮",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 4,
      "title": "Topic to be announced",
      "date": "2026-11-02",
      "icon": "🔭",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 5,
      "title": "Topic to be announced",
      "date": "2026-11-09",
      "icon": "🧠",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 6,
      "title": "Topic to be announced",
      "date": "2026-11-16",
      "icon": "🏷️",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 7,
      "title": "Topic to be announced",
      "date": "2026-11-23",
      "icon": "🧩",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 8,
      "title": "Topic to be announced",
      "date": "2026-11-30",
      "icon": "🎯",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 9,
      "title": "Topic to be announced",
      "date": "2026-12-07",
      "icon": "🎞️",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 10,
      "title": "Topic to be announced",
      "date": "2026-12-14",
      "icon": "🔗",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 11,
      "title": "Topic to be announced",
      "date": "2027-01-04",
      "icon": "📊",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 12,
      "title": "Topic to be announced",
      "date": "2027-01-11",
      "icon": "🪞",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 13,
      "title": "Topic to be announced",
      "date": "2027-01-18",
      "icon": "🧬",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 14,
      "title": "Topic to be announced",
      "date": "2027-01-25",
      "icon": "🧭",
      "blurb": "Not held yet. Topic to be announced; the summary appears here once the lecture is over and its slides are on the course page."
     },
     {
      "n": 15,
      "title": "Topic to be announced",
      "date": "2027-02-01",
      "icon": "🎓",
      "blurb": "Last lecture of the term (Mon 1 Feb 2027). Topic to be announced."
     }
    ],
    "exercises": [
     {
      "n": 1,
      "date": "2026-10-13"
     },
     {
      "n": 2,
      "date": "2026-10-20"
     },
     {
      "n": 3,
      "date": "2026-10-27"
     },
     {
      "n": 4,
      "date": "2026-11-03"
     },
     {
      "n": 5,
      "date": "2026-11-10"
     },
     {
      "n": 6,
      "date": "2026-11-17"
     },
     {
      "n": 7,
      "date": "2026-11-24"
     },
     {
      "n": 8,
      "date": "2026-12-01"
     },
     {
      "n": 9,
      "date": "2026-12-08"
     },
     {
      "n": 10,
      "date": "2026-12-15"
     },
     {
      "n": 11,
      "date": "2027-01-05"
     },
     {
      "n": 12,
      "date": "2027-01-12"
     },
     {
      "n": 13,
      "date": "2027-01-19"
     },
     {
      "n": 14,
      "date": "2027-01-26"
     },
     {
      "n": 15,
      "date": "2027-02-02"
     }
    ],
    "reading": [
     {
      "t": "Computer Vision: Algorithms and Applications (2nd ed.)",
      "a": "R. Szeliski",
      "y": 2022,
      "v": "Springer; free PDF on the author's site",
      "url": "https://szeliski.org/Book/",
      "why": "general textbook covering image operators, segmentation, recognition and tracking (not an official course reference)"
     },
     {
      "t": "A Computational Approach to Edge Detection",
      "a": "J. Canny",
      "y": 1986,
      "v": "IEEE TPAMI 8(6)",
      "url": "https://doi.org/10.1109/TPAMI.1986.4767851",
      "why": "cited in the lecture-1 slides (Canny's edge detector)"
     },
     {
      "t": "A Combined Corner and Edge Detector",
      "a": "C. Harris & M. Stephens",
      "y": 1988,
      "v": "Alvey Vision Conference",
      "url": "https://www.bmva.org/bmvc/1988/avc-88-023.pdf",
      "why": "cited in the lecture-1 slides (Harris' corner detector)"
     }
    ]
   },
   "status": {
    "opal": true,
    "selma": false
   },
   "schedule": {
    "src": "TU Dresden lecture period for winter 2026/27 (Mondays 12 Oct – 1 Feb, Christmas break 20 Dec – 3 Jan) with the weekly slots from OPAL; the course page lists chapters but no dates, so only lecture 1 has a topic",
    "lab": true,
    "rows": [
     [
      "2026-10-12",
      "Lecture 1: Operators on digital images",
      "Exercise 1 · Tue 13 Oct (group 1)"
     ],
     [
      "2026-10-19",
      "Lecture 2: Topic to be announced",
      "Exercise 2 · Tue 20 Oct (group 1)"
     ],
     [
      "2026-10-26",
      "Lecture 3: Topic to be announced",
      "Exercise 3 · Tue 27 Oct (group 1)"
     ],
     [
      "2026-11-02",
      "Lecture 4: Topic to be announced",
      "Exercise 4 · Tue 3 Nov (group 1)"
     ],
     [
      "2026-11-09",
      "Lecture 5: Topic to be announced",
      "Exercise 5 · Tue 10 Nov (group 1)"
     ],
     [
      "2026-11-16",
      "Lecture 6: Topic to be announced",
      "Exercise 6 · Tue 17 Nov (group 1)"
     ],
     [
      "2026-11-23",
      "Lecture 7: Topic to be announced",
      "Exercise 7 · Tue 24 Nov (group 1)"
     ],
     [
      "2026-11-30",
      "Lecture 8: Topic to be announced",
      "Exercise 8 · Tue 1 Dec (group 1)"
     ],
     [
      "2026-12-07",
      "Lecture 9: Topic to be announced",
      "Exercise 9 · Tue 8 Dec (group 1)"
     ],
     [
      "2026-12-14",
      "Lecture 10: Topic to be announced",
      "Exercise 10 · Tue 15 Dec (group 1)"
     ],
     [
      "2027-01-04",
      "Lecture 11: Topic to be announced",
      "Exercise 11 · Tue 5 Jan (group 1)"
     ],
     [
      "2027-01-11",
      "Lecture 12: Topic to be announced",
      "Exercise 12 · Tue 12 Jan (group 1)"
     ],
     [
      "2027-01-18",
      "Lecture 13: Topic to be announced",
      "Exercise 13 · Tue 19 Jan (group 1)"
     ],
     [
      "2027-01-25",
      "Lecture 14: Topic to be announced",
      "Exercise 14 · Tue 26 Jan (group 1)"
     ],
     [
      "2027-02-01",
      "Lecture 15: Topic to be announced",
      "Exercise 15 · Tue 2 Feb (group 1)"
     ]
    ]
   }
  },
  "CMS-TRK-MLSP": {
   "code": "CMS-TRK-MLSP",
   "name": "Machine Learning in Signal Processing",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 1,
   "lp": 5,
   "sws": "2/1/0/1",
   "extra": "",
   "pl": 2,
   "desc": "Machine learning seen through estimation theory and applied to signals: regression, classification, splines, wavelets, convex optimization, support vector machines and the basics of neural networks. A recurring theme is the trade-off between a model’s flexibility and how well it generalizes, especially in high dimensions.",
   "coord": "Prof. Dr. Gerhard Fettweis",
   "freq": "Every winter semester",
   "exam": "Written exam, 120 min, plus an ungraded portfolio (15 h)",
   "prereq": "Probability theory and linear algebra",
   "winter": {
    "who": "Dr.-Ing. Meik Dörpinghaus",
    "q": "CMS-TRK-MLSP"
   },
   "goals": "Students will gain an overview of fundamental machine learning methods and their application in signal processing, with a particular focus on the estimation-theoretic foundations of learning algorithms. Students will understand the design principles of machine learning algorithms and the fundamental trade-off between the flexibility of a machine learning model and its generalization ability. They will be familiar with methods of signal preprocessing and signal representation for applying machine learning to signal processing problems.",
   "contents": "The module covers fundamental methods for regression and classification, such as linear regression, logistic regression, and the k-nearest-neighbor algorithm, as well as their foundations in estimation theory, the trade-off between a model’s flexibility and its generalization ability, characteristics of learning in high-dimensional spaces compared to learning in low-dimensional spaces, increasing the flexibility of linear models using polynomials and splines, wavelets for structured signal representation, key concepts of convex optimization, support vector machines, and the fundamentals of neural networks.",
   "links": {
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/21509210126"
   },
   "register": "In OPAL as “Maschinelles Lernen in der Signalverarbeitung” (Dr.-Ing. Meik Dörpinghaus). Lectures and exercises are in person; programming exercises handed out during the semester are mandatory for CMS-TRK-MLSP. Register for the exam in Selma.",
   "schedule": {
    "src": "OPAL",
    "rows": [
     [
      "2026-10-13",
      "Exercise 1"
     ],
     [
      "2026-10-16",
      "Lecture 1"
     ],
     [
      "2026-10-23",
      "Lecture 2"
     ],
     [
      "2026-10-27",
      "Exercise 2"
     ],
     [
      "2026-10-30",
      "Lecture 3"
     ],
     [
      "2026-11-06",
      "Lecture 4"
     ],
     [
      "2026-11-10",
      "Exercise 3"
     ],
     [
      "2026-11-13",
      "Lecture 5"
     ],
     [
      "2026-11-20",
      "Lecture 6"
     ],
     [
      "2026-11-24",
      "Exercise 4"
     ],
     [
      "2026-11-27",
      "Lecture 7"
     ],
     [
      "2026-12-04",
      "Lecture 8"
     ],
     [
      "2026-12-08",
      "Exercise 5"
     ],
     [
      "2026-12-11",
      "Lecture 9"
     ],
     [
      "2026-12-18",
      "Lecture 10"
     ],
     [
      "2027-01-08",
      "Lecture 11"
     ],
     [
      "2027-01-12",
      "Exercise 6"
     ],
     [
      "2027-01-15",
      "Lecture 12"
     ],
     [
      "2027-01-22",
      "Lecture 13"
     ],
     [
      "2027-01-26",
      "Exercise 7"
     ],
     [
      "2027-01-29",
      "Lecture 14"
     ],
     [
      "2027-02-05",
      "Lecture 15"
     ]
    ]
   }
  },
  "CMS-TRK-APSS": {
   "code": "CMS-TRK-APSS",
   "name": "Advanced Problem Solving and Search",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 1,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "How to model and solve hard combinatorial and search problems formally. Covers informed and uninformed search, local search such as simulated annealing and tabu search, constraint satisfaction, evolutionary algorithms, answer set programming, and tree and hypertree decompositions.",
   "coord": "Dr. Sarah Alice Gaggl",
   "freq": "Every winter semester",
   "exam": "Written exam, 90 min",
   "prereq": "Algorithm design, formal languages, theoretical computer science, propositional and predicate logic",
   "winter": {
    "who": "Dr. Sarah Alice Gaggl, Dr. habil. Hannes Straß, Dr. Timothy S. Lyon",
    "q": "Advanced Problem Solving and Search"
   },
   "goals": "Students will become familiar with scientific methods for addressing complex combinatorial and search problems relevant to applications in computer science. They will understand the formal modeling of these problems and be familiar with methods for solving them. They will be able to formally analyze the computational properties of these problems and associated algorithms.",
   "contents": "The module covers uninformed and informed search, local search, stochastic hill climbing, simulated annealing, tabu search, constraint satisfaction problems, evolutionary and genetic algorithms, answer set programming, and structural decomposition techniques such as tree and hypertree decompositions.",
   "links": {
    "web": "https://iccl.inf.tu-dresden.de/web/Advanced_Problem_Solving_and_Search_(WS2026)",
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/56319377408"
   },
   "note": "First lecture on 20 October 2026. You're in tutorial group 2 (Fridays, DS4); changes are only announced to registered group members. Slides and exercise sheets are uploaded in OPAL per session."
  },
  "CMS-TRK-CAI": {
   "code": "CMS-TRK-CAI",
   "name": "Conversational Artificial Intelligence",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 1,
   "lp": 5,
   "sws": "0/0/2/0",
   "extra": "",
   "pl": 1,
   "desc": "A seminar on dialogue-based AI: you work through the research literature on conversational AI on your own and present what you learned in English. There are no lectures; the grade comes from a written assignment.",
   "coord": "Hon.-Prof. Dr. Jens Lehmann",
   "freq": "Every winter semester",
   "exam": "Assignment (50 h)",
   "prereq": "None",
   "goals": "Students will be able to independently acquire knowledge of methods in the field of Conversational Artificial Intelligence from the literature and present this knowledge in English.",
   "contents": "The module covers methods in the field of dialogue-based artificial intelligence.",
   "links": {
    "web": "https://jens-lehmann.org/seminars-and-teaching/courses-at-tu-dresden/seminar-conversational-ai/",
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/56149671937"
   },
   "register": "Seminar “Conversational AI 2026” (Charvi Jain, chair of Hon.-Prof. Dr. Jens Lehmann), starting 15 Oct. Two intro lectures, then each student presents a topic (e.g. LLM architectures, knowledge retrieval, LLMs and knowledge graphs, agentic workflows); interim presentation late Nov / early Dec, final presentations after New Year. Register in Selma and OPAL.",
   "winter": {
    "who": "Hon.-Prof. Dr. Jens Lehmann",
    "q": "Conversational Artificial Intelligence"
   }
  },
  "CMS-TRK-FCG": {
   "code": "CMS-TRK-FCG",
   "name": "Foundations of Computer Graphics",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 1,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "The building blocks of a graphics application: transformations, color, parametric curves and surfaces, and polygon meshes. You learn the rendering pipeline, lighting and texturing, how to implement a ray tracer, and animation with keyframes, particle systems and morphing.",
   "coord": "Prof. Dr. Stefan Gumhold",
   "freq": "Every winter semester",
   "exam": "Written exam, 90 min (exercises earn a bonus)",
   "prereq": "Vectors and matrices, imperative programming",
   "winter": {
    "who": "Prof. Dr. Stefan Gumhold (as “Computer Graphics I”)",
    "q": "CMS-TRK-FCG"
   },
   "goals": "Students will be familiar with the components of a graphics application and will be able to design new graphics applications based on specific requirements. They will be able to apply and analyze the fundamentals of computer graphics in solving graphics-related problems. They will have an overview of the subfields of modeling, rendering, and animation, and will be able to establish connections between these areas and address interdisciplinary problems. In addition, they can propose suitable geometric representations for a given problem and can describe, implement, and analyze fundamental algorithms of geometric modeling. You are familiar with the stages of the rendering pipeline and can describe the underlying techniques. You can explain the concept of ray tracing and have a detailed understanding of how to implement a ray tracer. You are familiar with basic animation techniques, can explain the mathematical principles behind them, and describe how to enhance a graphics application with animations.",
   "contents": "The module covers working with vectors and transformations, color perception and color spaces, as well as the architecture of graphics systems; modeling, such as parametric curves and surfaces; basic modeling techniques and polygonal meshes; and visualization using the rendering pipeline, basic lighting calculations, texturing, and the ray tracing method. Additional content related to animation includes approaches based on keyframes, particle systems, and morphing, as well as the fundamentals of using acceleration data structures.",
   "links": {
    "web": "https://tu-dresden.de/ing/informatik/smt/cgv/studium/lehrveranstaltung"
   }
  },
  "CMS-TRK-DDA": {
   "code": "CMS-TRK-DDA",
   "name": "Digitization and Data Analytics",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 2,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "Managing and analysing large datasets: storage and metadata strategies, preprocessing, exploratory analysis, statistics and machine learning. You apply the methods with current frameworks both locally and on high-performance computing (HPC) systems.",
   "coord": "Prof. Dr. Wolfgang Nagel",
   "freq": "Every summer semester",
   "exam": "Written exam, 90 min",
   "prereq": "Statistics, linear algebra, Python",
   "goals": "Students will understand various concepts related to data storage and metadata collection and will be able to develop data management strategies for existing datasets. Students will be familiar with and understand various methods of data preprocessing, exploratory data analysis, and machine learning; they will be able to assess the strengths and weaknesses of these methods in relation to given data and apply them using current software frameworks both locally and on an HPC infrastructure.",
   "contents": "The module covers current approaches to analyzing large data sets (big data) for specific computer architectures, as well as processing in the context of high-performance computing (HPC); various data analytics approaches and their application in the HPC environment. Additional topics include data analytics frameworks, fundamentals of statistical analysis, machine learning methods, and selected applications.",
   "links": {}
  },
  "CMS-TRK-AL": {
   "code": "CMS-TRK-AL",
   "name": "Adaptive Laser Systems",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 2,
   "lp": 5,
   "sws": "2/1/0/1",
   "extra": "",
   "pl": 2,
   "desc": "The physics and system design of adaptive laser sensors: Gaussian beams, interferometry, ultrashort-pulse lasers, Fourier optics and fiber-optic sensing. Applications range from biophotonics and medical technology to optical information and energy technology.",
   "coord": "Prof. Dr. Jürgen Czarske",
   "freq": "Every summer semester",
   "exam": "Oral exam, 20 min (weight 3) + portfolio, 20 h (weight 1)",
   "prereq": "Physics, systems theory, optics and photonics",
   "goals": "Upon completion of the module, students will be able to describe and evaluate the physical principles and technical design of adaptive laser sensors. They will have mastered the fundamental approaches and methods of system design for modern laser sensors.",
   "contents": "The module covers laser measurement technology, including fundamental principles of physics and electrical engineering such as Gaussian beams, interferometry, ultrashort-pulse lasers, Fourier optics, and fiber-optic sensing, as well as the practical implementation and application of adaptive laser sensors in fields such as biophotonics, medical technology, optical information technology, and energy technology.",
   "links": {}
  },
  "CMS-TRK-CSD": {
   "code": "CMS-TRK-CSD",
   "name": "Circuit and System Design",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 2,
   "lp": 5,
   "sws": "2/1/0/0",
   "extra": "+ 2 SWS project",
   "pl": 1,
   "desc": "A hands-on module in designing application-specific chips (ASICs). You turn a numerical algorithm of your choice into a data-dependency graph, schedule and allocate it, build the datapath and control logic in a hardware description language such as Verilog, then verify and simulate it.",
   "coord": "Prof. Dr. Christian Georg Mayr",
   "freq": "Every summer semester",
   "exam": "Assignment (40 h)",
   "prereq": "Systems theory and Digital Circuit Design (CMS-TRK-DCD)",
   "lang": "German or English",
   "goals": "Students will be able to systematically develop the data path (register-transfer description) and the control logic (FSM) of a numerically-based algorithm of their own choosing using a data dependency graph. They are familiar with the implementation workflow, which includes both the automated synthesis of complex blocks based on a hardware description language—such as Verilog—and manually optimized digital data path elements.",
   "contents": "The module covers the fundamentals and methods for developing application-specific digital integrated circuits (ASICs). This includes the conversion of a numerical algorithm into a data dependency graph, the application of scheduling and allocation methods, optimization with regard to resource consumption—such as area and runtime—as well as the implementation, functional verification, and simulation of the ASIC.",
   "links": {
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/53465382917"
   },
   "note": "Summer-semester module. You are already in its OPAL course; sessions start in the summer semester. The chair's winter timetable also lists a “Schaltkreis- und Systementwurf” lab on Wednesdays 4th DS (13:00–14:30) in TOE 201 from 14 Oct; check in OPAL whether it applies to you (it would overlap the Data Visualization lecture).",
   "opalText": "The module covers the fundamentals and methods for the development of application-specific digital integrated circuits (ASICs). This includes transforming a numerical algorithm into a data dependency graph, applying scheduling and allocation techniques, optimizing resource usage (area, runtime), as well as implementation and functional verification (simulation) of the ASIC."
  },
  "CMS-TRK-DNNH": {
   "code": "CMS-TRK-DNNH",
   "name": "Deep Neural Network Hardware",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 2,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "How hardware accelerators for deep neural networks are designed, from the overall architecture down to arithmetic building blocks. Covers hardware–software co-design, the steps needed to run a network on an accelerator, and current optimization techniques.",
   "coord": "Prof. Dr. Christian Georg Mayr",
   "freq": "Every summer semester",
   "exam": "Written exam, 90 min",
   "prereq": "None",
   "goals": "Students will gain a solid understanding of the key design decisions involved in DNN accelerators. They will be able to select or design an accelerator for a given application. They will know and understand the necessary steps for running deep neural networks (DNNs) on hardware accelerators, as well as common optimization methods for DNN accelerators.",
   "contents": "The module covers the design of hardware accelerators for deep neural networks (DNNs)—from architectures to arithmetic building blocks—hardware and software co-designs for DNN accelerators, the necessary steps for executing DNNs on hardware accelerators, as well as current optimization methods and novel approaches for DNN accelerators.",
   "links": {}
  },
  "CMS-TRK-VR": {
   "code": "CMS-TRK-VR",
   "name": "Virtual Reality",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 2,
   "lp": 5,
   "sws": "2/0/0/0",
   "extra": "+ 20 h internship",
   "pl": 1,
   "desc": "The technology behind virtual environments and the role of AI in them, with a focus on the senses: spatial audio (binaural, ambisonics, wave-field synthesis), sound synthesis, haptic devices and perception, and displays from headsets to CAVEs. Includes a 20-hour project; applications span education, industry, telesurgery and care.",
   "coord": "Prof. Dr. Ercan Altinsoy",
   "freq": "Every summer semester",
   "exam": "Assignment (20 h)",
   "prereq": "None",
   "goals": "Students will gain knowledge and understanding of the technological foundations, basic principles, and technical terminology of virtual reality, particularly the design and functioning of virtual environments and the integration of virtual reality and artificial intelligence. They will be able to design acoustic, haptic, and visual sensors, actuators, and systems, and will be familiar with the development and application of VR systems in education, industry, telesurgery, teletherapy, and nursing. Students will be able to identify and understand problems in this field of application and develop solutions.",
   "contents": "The module covers selected techniques, methods, and current technologies used in virtual reality, the role of AI in virtual reality, audio recording and playback technologies—in particular, binaural technology, stereophony, ambisonics, wavefield synthesis, and the implementation of room acoustic models—as well as sound synthesis methods, haptic devices, haptic perception, and visual output devices—in particular, VR headsets, head-mounted displays, and cave environments.",
   "links": {}
  },
  "CMS-TRK-HWSWC": {
   "code": "CMS-TRK-HWSWC",
   "name": "Hardware-Software Co-Design",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 2,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "How hardware and software are designed together for embedded systems, especially for signal processing in communications. You compare hardware platforms by flexibility and power use, derive hardware requirements from algorithms, and learn strategies for more performance at lower power.",
   "coord": "Prof. Dr. Gerhard Fettweis",
   "freq": "Every summer semester",
   "exam": "Written exam, 120 min",
   "prereq": "Computer architecture, digital signal processing algorithms",
   "goals": "Students will gain an overview of current hardware architectures, particularly various hardware platforms for the software implementation of digital signal processing algorithms, and will be able to evaluate these platforms based on various criteria, such as flexibility and power consumption. Students can derive hardware requirements from algorithms, taking into account flexibility requirements for both hardware and software components. They are familiar with strategies for improving performance and minimizing power consumption and can apply these confidently.",
   "contents": "The module covers methods and various aspects of the hardware and software implementation of embedded systems, including those in communications engineering; the mutual influence of both design areas—that is, co-design—with a view to optimizing circuit design; and new parallel processing concepts resulting from massive scaling down toward the nanoscale.",
   "links": {},
   "register": "Summer-semester module, so it isn't offered this winter. Registration opens in the summer semester."
  },
  "CMS-TRK-ARCCAM": {
   "code": "CMS-TRK-ARCCAM",
   "name": "Applied Robotics & Control for Cooperative and Autonomous Mobility",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 2,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "Robotics and control theory applied to traffic: the architecture of autonomous driving systems, their sensors and communication, and cooperative adaptive cruise control. You program and test small mobile robots in the MiniCCAM lab and design a controller for a traffic problem. Limited to 15 students, chosen by lottery.",
   "coord": "Prof. Dr. Meng Wang",
   "freq": "Every summer semester",
   "exam": "Assignment (70 h)",
   "prereq": "Python, control theory, linear algebra",
   "goals": "Students will be familiar with fundamental theories of robotics and control engineering and will be able to identify and explain basic phenomena in traffic systems with regard to inefficiencies, risks, and environmental impacts; describe the architecture and functionality of key components of autonomous driving systems; apply robotics and control theories to program and test mobile robots in a miniature laboratory, design and implement a controller in a mobile robot to solve a traffic problem, and evaluate the performance of a controller.",
   "contents": "The module covers experimental learning with mobile robots in a full-scale laboratory, focusing in particular on the fundamentals of traffic phenomena as they relate to traffic safety, traffic congestion, and emissions; the state of the art in autonomous driving systems; the architecture of autonomous driving systems; key components such as sensors, control systems, and communication technologies; examples of Cooperative Adaptive Cruise Control (CACC), as well as programming and testing robot systems in a Miniature Connected, Cooperative, and Automated Mobility Lab (MiniCCAM). Additional topics include the fundamentals of cooperative control theory, particularly the implementation of a controller in a multi-robot system, performance testing of controllers, and the documentation of performance tests and controller evaluations.",
   "links": {}
  },
  "CMS-TRK-RL": {
   "code": "CMS-TRK-RL",
   "name": "Robot Learning",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 2,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "Machine learning for robots: classical control foundations, optimization, supervised learning and reinforcement learning. Applied to navigation, manipulation, locomotion and multi-agent systems, with your own implementations evaluated empirically.",
   "coord": "Prof. Dr. Roberto Calandra",
   "freq": "Every summer semester",
   "exam": "Written exam, 90 min",
   "prereq": "None",
   "goals": "Students will acquire in-depth knowledge of machine learning methods in the field of robotics and will be able to independently apply these methods. They will be able to mathematically describe machine learning problems in robotics, implement algorithms to solve these problems on their own, and empirically and quantitatively evaluate the application of these algorithms in the context of specific applications.",
   "contents": "The module covers the fundamentals of classical control theory, machine learning methods in robotics—such as optimization, supervised learning for robotics, and reinforcement learning—as well as problems and applications of machine learning methods in robotics, including navigation, manipulation, locomotion, and multi-agent systems.",
   "links": {}
  },
  "CMS-TRK-SciVis": {
   "code": "CMS-TRK-SciVis",
   "name": "Scientific Visualization",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 2,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "Advanced visualization of scientific data: stereoscopy, particle, terrain and volume visualization, plus topological methods and vector and tensor fields. The focus is on data structures and rendering algorithms that keep very large datasets interactive.",
   "coord": "Prof. Dr. Stefan Gumhold",
   "freq": "Every summer semester",
   "exam": "Written exam, 90 min (exercises earn a bonus)",
   "prereq": "Foundations of Computer Graphics (CMS-TRK-FCG) and Data Visualization (CMS-COR-VIZ)",
   "goals": "Students will learn the fundamentals of stereo-based visualization, particle visualization, terrain visualization, and volume visualization. They will understand how various features are mapped to visual attributes. They are familiar with the necessary hardware, data structures, and algorithms. In particular, they are familiar with rendering approaches that enable the interactive visualization of large datasets. They know how hierarchical and batch-based structuring can be implemented.",
   "contents": "The module covers the application areas of stereoscopy, particle visualization, terrain visualization, and volume visualization. The stereoscopy application area includes perception, display technology, and rendering, while the particle visualization application area covers datasets, glyph-based visualization, and efficient rendering algorithms. Additional content in the field of terrain visualization includes terrain models, data structures, and efficient rendering algorithms, while the field of volume visualization covers volume rendering integrals, lighting models, advanced transfer function design, and rendering algorithms for various volume representations. Additional topics covered in the module include topological methods, vector field visualization, and tensor field visualization.",
   "links": {}
  },
  "CMS-TRK-CRC": {
   "code": "CMS-TRK-CRC",
   "name": "Computer- and Robot-Assisted Surgery",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 3,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "The methods behind computer- and robot-assisted surgery: medical image acquisition, processing, segmentation and registration, robotic and navigation systems, intraoperative assistance and augmented reality. Includes current research and clinical application examples.",
   "coord": "Prof. Dr. Stefanie Speidel",
   "freq": "Every winter semester",
   "exam": "Oral exam, 30 min",
   "prereq": "Calculus, linear algebra, programming",
   "winter": {
    "who": "Prof. Dr. Stefanie Speidel",
    "q": "CMS-TRK-CRC"
   },
   "goals": "Students will master the methodological and practical fundamentals of computer- and robot-assisted surgery. They will be able to apply these methods, tackle new interdisciplinary tasks, select appropriate solutions, and develop new approaches.",
   "contents": "The module covers computer- and robot-assisted surgery. It includes the fundamentals of image acquisition, medical image processing and segmentation, registration, the basics of robotic and navigation systems, intraoperative assistance, and augmented reality, as well as insights into current research, clinical issues, and application examples.",
   "links": {}
  },
  "CMS-TRK-SD": {
   "code": "CMS-TRK-SD",
   "name": "Sound Design",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 3,
   "lp": 5,
   "sws": "2/0/0/0",
   "extra": "+ 20 h project",
   "pl": 1,
   "desc": "Designing sounds that carry information or evoke a reaction, based on how acoustic signals relate to what we perceive. Covers perceptual aspects of sound and generative AI tools for audio, with a 20-hour project in interdisciplinary teams.",
   "coord": "Prof. Dr. Ercan Altinsoy",
   "freq": "Every winter semester",
   "exam": "Assignment (20 h)",
   "prereq": "None",
   "winter": {
    "who": "Prof. Dr. Ercan Altinsoy",
    "q": "CMS-TRK-SD"
   },
   "goals": "Students will be familiar with and understand the technological foundations, basic principles, and technical terminology of sound design, particularly the design of sounds and noises, as well as generative AI tools for audio applications. They will be able to design acoustic signals, make environmental phenomena and events audible, convey messages, and elicit or amplify affective, cognitive, and/or psychomotor responses through acoustic signals. They are able to comprehend problems in acoustics and sound design and know how to develop solutions incorporating approaches from computer science. Students can lead and participate in interdisciplinary projects and teams.",
   "contents": "The module covers methods of sound design, particularly the relationship between acoustic signals as carriers of information and the associated auditory perceptions, and, in this context, the examination of perceptual aspects of sounds.",
   "links": {}
  },
  "CMS-TRK-CLS": {
   "code": "CMS-TRK-CLS",
   "name": "Computational Laser Systems",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 3,
   "lp": 5,
   "sws": "3/1/0/0",
   "extra": "",
   "pl": 1,
   "desc": "Computer-aided optical imaging that combines laser physics, signal processing and Fourier optics. Topics include digital holography and image processing, biomedical laser systems and optogenetics, adaptive optics, and diffractive neural networks that compute with light.",
   "coord": "Prof. Dr. Jürgen Czarske",
   "freq": "Every winter semester",
   "exam": "Oral exam, 30 min (German or English)",
   "prereq": "Physics, systems theory, optics and photonics",
   "lang": "German or English",
   "winter": {
    "who": "Prof. Dr. Jürgen Czarske, Dr. Nektarios Koukourakis (two courses: “Biomedical Laser Systems and Optogenetics” and “Digital holography and image processing”)",
    "q": "CMS-TRK-CLS"
   },
   "goals": "Students will be able to apply their knowledge of laser physics, systems theory, digital signal processing, and Fourier optics to describe and design computer-aided optical imaging systems.",
   "contents": "The module covers digital holography and image processing, as well as biomedical laser systems and optogenetics. Topics include, among others, self-parameterization of laser systems, optogenetics through scattering tissue, neural networks for signal processing, adaptive optics, and diffractive deep neural networks for optical computing at the speed of light.",
   "links": {}
  },
  "CMS-TRK-TSP": {
   "code": "CMS-TRK-TSP",
   "name": "Touch Sensing and Processing",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 3,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "Giving machines a sense of touch: the psychology of touch, tactile sensing hardware, touch simulation and processing, and touch-based control. You implement the algorithms on real sensor hardware and evaluate them quantitatively.",
   "coord": "Prof. Dr. Roberto Calandra",
   "freq": "Every winter semester",
   "exam": "Portfolio (10 h)",
   "prereq": "None",
   "winter": {
    "who": "Prof. Dr. Roberto Calandra",
    "q": "CMS-TRK-TSP"
   },
   "goals": "Students will gain in-depth knowledge of touch-sensing and touch-processing techniques. They will be able to independently implement these techniques algorithmically. They will be able to apply these algorithms in practice, on specific touch-sensing hardware, and to specific problems, and will be able to empirically and quantitatively evaluate the algorithms in relation to their application.",
   "contents": "The module covers the fundamentals of the psychology of the sense of touch, touch-sensing hardware, simulation of touch, touch sensing, touch processing, touch-based control, and applications of touch sensing, touch processing, and touch-based control.",
   "links": {
    "web": "https://lasr.org/teaching",
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/45408092160"
   },
   "note": "OPAL calendar: Mondays 9:20–10:50 in BEY/0245/H (lectures) and Tuesdays 9:20–10:50 in APB-E040 (exercises; 13 Oct in BEY/0137/U), 12 Oct – 19 Jan. Questions via teaching@lasr.org.",
   "schedule": {
    "src": "OPAL (course structure page, 2026-10-12, rechecked 2026-10-15: Lecture 3 moved to 19 Oct, Exercise 1 to 20 Oct, Exercise 2 to Mon 26 Oct in BEY/0245/H; exercise topics from the practice list, assuming Exercise n = Practice n−1)",
    "rows": [
     [
      "2026-10-12",
      "Lecture 0 + 1: Welcome · The importance of Touch in Humans and Robots"
     ],
     [
      "2026-10-13",
      "Lecture 2: Brief Introduction to the Physiology of Touch"
     ],
     [
      "2026-10-19",
      "Lecture 3: Touch Sensing Hardware"
     ],
     [
      "2026-10-20",
      "Exercise 1: PyTorch and Deep Learning"
     ],
     [
      "2026-10-26",
      "Exercise 2: The importance of Touch in Humans and Robots"
     ],
     [
      "2026-10-27",
      "Exercise 3: Brief Introduction to the Physiology of Touch"
     ],
     [
      "2026-11-02",
      "Lecture 4: Vision-based Tactile Sensors 1"
     ],
     [
      "2026-11-03",
      "Exercise 4: Vision-based Tactile Sensors 1"
     ],
     [
      "2026-11-09",
      "Lecture 5: Vision-based Tactile Sensors 2"
     ],
     [
      "2026-11-10",
      "Exercise 5: Vision-based Tactile Sensors 2"
     ],
     [
      "2026-11-16",
      "Lecture 6: Simulating Touch"
     ],
     [
      "2026-11-17",
      "Exercise 6: Vision-based Tactile Sensors 3"
     ],
     [
      "2026-11-23",
      "Lecture 7: Perception with Touch"
     ],
     [
      "2026-11-24",
      "Exercise 7: Simulating Touch"
     ],
     [
      "2026-11-30",
      "Lecture 8: ML for Touch 1"
     ],
     [
      "2026-12-01",
      "Exercise 8: Perception with Touch"
     ],
     [
      "2026-12-07",
      "Lecture 9: ML for Touch 2"
     ],
     [
      "2026-12-08",
      "Exercise 9: ML for Touch 1"
     ],
     [
      "2026-12-14",
      "Lecture 10: Touch-based Control 1"
     ],
     [
      "2026-12-15",
      "Exercise 10: ML for Touch 2"
     ],
     [
      "2027-01-04",
      "Lecture 11: Touch-based Control 2"
     ],
     [
      "2027-01-05",
      "Exercise 11: ML for Touch 3"
     ],
     [
      "2027-01-11",
      "Lecture 12: Other applications of Touch"
     ],
     [
      "2027-01-12",
      "Exercise 12: Depth Estimation"
     ],
     [
      "2027-01-18",
      "Lecture 13: Recap and Exam preparation"
     ],
     [
      "2027-01-19",
      "Exercise 13 (topic not listed yet)"
     ]
    ]
   },
   "status": {
    "opal": true,
    "selma": false
   },
   "course": {
    "page": "touch-sensing.html",
    "rooms": {
     "lecture": "BEY/0245/H (Mon)",
     "exercise": "APB-E040 (Tue; 13 Oct in BEY/0137/U)"
    },
    "keyDates": [
     {
      "date": "2026-10-12",
      "label": "First lecture (L0 + L1)",
      "kind": "lecture"
     },
     {
      "date": "2026-10-20",
      "label": "First exercise (PyTorch)",
      "kind": "exercise"
     },
     {
      "date": "2026-10-31",
      "label": "OPAL enrolment / unenrolment closes",
      "kind": "deadline"
     },
     {
      "date": "2026-12-14",
      "label": "Selma exam registration opens",
      "kind": "deadline"
     },
     {
      "date": "2027-01-18",
      "label": "Recap & exam preparation",
      "kind": "lecture"
     },
     {
      "date": "2027-01-19",
      "label": "Last exercise",
      "kind": "exercise"
     },
     {
      "date": "2027-01-25",
      "label": "Selma registration closes (portfolio / oral)",
      "kind": "deadline"
     },
     {
      "date": "2027-03-31",
      "label": "Selma registration closes (written exam, CMS-AAI-TSP)",
      "kind": "deadline"
     }
    ],
    "grading": [
     {
      "variant": "CMS-AAI-TSP",
      "how": "100 % written exam (90 min)",
      "selma": "14 Dec 2026 – 31 Mar 2027"
     },
     {
      "variant": "CMS-TRK-TSP (new study regulation)",
      "how": "Portfolio",
      "selma": "14 Dec 2026 – 25 Jan 2027"
     },
     {
      "variant": "CMS old regulation (not AAI)",
      "how": "80 % oral exam + 20 % home exercises",
      "selma": "14 Dec 2026 – 25 Jan 2027"
     }
    ],
    "homeExercises": 3,
    "format": "12 lectures and 12 practices, all in English; prior knowledge of Python/PyTorch and Machine Learning 1 strongly recommended.",
    "contact": "teaching@lasr.org (or the OPAL e-mail form; no direct personal e-mails)",
    "feedback": "https://forms.gle/stWPRCG7vm5j5Cpf7",
    "reading": [
     {
      "t": "Coding and use of tactile signals from the fingertips in object manipulation tasks",
      "a": "Johansson & Flanagan",
      "y": 2009,
      "v": "Nature Reviews Neuroscience"
     },
     {
      "t": "The Feeling of Success: Does Touch Sensing Help Predict Grasp Outcomes?",
      "a": "Calandra et al.",
      "y": 2017,
      "v": "CoRL",
      "url": "https://arxiv.org/abs/1710.05512"
     },
     {
      "t": "DIGIT: A Novel Design for a Low-Cost Compact High-Resolution Tactile Sensor",
      "a": "Lambeta et al.",
      "y": 2020,
      "v": "RA-L",
      "url": "https://arxiv.org/abs/2005.14679"
     },
     {
      "t": "PyTouch: A Machine Learning Library for Touch Processing",
      "a": "Lambeta et al.",
      "y": 2021,
      "v": "ICRA",
      "url": "https://arxiv.org/abs/2105.12791"
     },
     {
      "t": "TACTO: A Fast, Flexible, and Open-source Simulator for Vision-based Tactile Sensors",
      "a": "Wang et al.",
      "y": 2022,
      "v": "RA-L",
      "url": "https://arxiv.org/abs/2012.08456"
     }
    ],
    "lectures": [
     {
      "n": 0,
      "title": "Welcome to Touch Sensing and Processing",
      "date": "2026-10-12",
      "icon": "👋",
      "covered": true,
      "blurb": "Course goals, format, grading variants and logistics from the welcome lecture."
     },
     {
      "n": 1,
      "title": "The importance of Touch in Humans and Robots",
      "date": "2026-10-12",
      "icon": "🤖",
      "covered": true,
      "blurb": "Why touch matters for humans and robots: Johansson's experiment, touch versus vision, and the grasp-success evidence."
     },
     {
      "n": 2,
      "title": "Brief Introduction to the Physiology of Touch",
      "date": "2026-10-13",
      "icon": "🧠",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 3,
      "title": "Touch Sensing Hardware",
      "date": "2026-10-19",
      "icon": "🔧",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 4,
      "title": "Vision-based Tactile Sensors 1",
      "date": "2026-11-02",
      "icon": "📷",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 5,
      "title": "Vision-based Tactile Sensors 2",
      "date": "2026-11-09",
      "icon": "🔍",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 6,
      "title": "Simulating Touch",
      "date": "2026-11-16",
      "icon": "🧪",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 7,
      "title": "Perception with Touch",
      "date": "2026-11-23",
      "icon": "👁️",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 8,
      "title": "ML for Touch 1",
      "date": "2026-11-30",
      "icon": "📈",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 9,
      "title": "ML for Touch 2",
      "date": "2026-12-07",
      "icon": "📊",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 10,
      "title": "Touch-based Control 1",
      "date": "2026-12-14",
      "icon": "🦾",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 11,
      "title": "Touch-based Control 2",
      "date": "2027-01-04",
      "icon": "🕹️",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 12,
      "title": "Other applications of Touch",
      "date": "2027-01-11",
      "icon": "🌍",
      "blurb": "Not held yet. The summary appears here once the lecture is over and its slides are on OPAL."
     },
     {
      "n": 13,
      "title": "Recap and Exam preparation",
      "date": "2027-01-18",
      "icon": "🎓",
      "blurb": "Recap of the course and preparation for the exam."
     }
    ]
   }
  },
  "CMS-TRK-TEA-CM": {
   "code": "CMS-TRK-TEA-CM",
   "name": "Team Assignment: Computational Metrology",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 3,
   "lp": 10,
   "sws": "",
   "extra": "8 SWS project",
   "pl": 1,
   "desc": "A team research project in computer-based measurement technology, for example solving an inverse problem with deep neural networks in physical or numerical experiments. Alongside the subject, it trains literature research, project management and teamwork.",
   "coord": "Prof. Dr. Jürgen Czarske",
   "freq": "Every semester",
   "exam": "Assignment (60 h)",
   "prereq": "None",
   "winter": {
    "who": "Prof. Dr. Jürgen Czarske",
    "q": "CMS-TRK-TEA-CM"
   },
   "goals": "Students will be able to work on a complex research-oriented project that requires expertise from multiple areas of computer-based measurement technology, as well as to solve a larger, typically interdisciplinary problem in the field of computer-based measurement technology and intelligence as part of a group. Students will master literature research and the use of scientific information sources, and will possess both in-depth subject expertise and extensive methodological and interpersonal skills related to project management and teamwork.",
   "contents": "The module covers the analysis and solution of a problem from the research field of computer-based measurement technology, for example, through physical or numerical experiments using deep neural networks to solve the inverse problem.",
   "links": {}
  },
  "CMS-TRK-DLVFA": {
   "code": "CMS-TRK-DLVFA",
   "name": "Deep Learning for Vision – Foundations and Applications",
   "area": "AAI track · elective",
   "group": "trk",
   "planSem": 3,
   "lp": 5,
   "sws": "2/2/0/0",
   "extra": "",
   "pl": 1,
   "desc": "Deep learning for image data: architectures such as CNNs and vision transformers, supervised and unsupervised training, and tasks like object recognition, tracking and segmentation. The focus is on implementing and training models for your own scientific imaging problems.",
   "coord": "Prof. Dr. Martin Weigert",
   "freq": "Every winter semester",
   "exam": "Written exam, 90 min",
   "prereq": "Linear algebra, programming, machine learning",
   "winter": {
    "who": "Prof. Dr. Martin Weigert",
    "q": "CMS-TRK-DLVFA"
   },
   "goals": "Students will learn about deep learning architectures for computer vision and become familiar with scientific applications such as object recognition, tracking, and segmentation. They will be able to implement and train deep learning models in order to apply modern methods specifically to their own image processing problems.",
   "contents": "The module covers basic concepts of deep learning for image data, including fundamental architectures such as CNNs and ViTs, as well as training paradigms such as supervised and unsupervised learning. Additional topics include applications in various scientific disciplines and the practical implementation of these methods.",
   "links": {}
  },
  "CMS-TRK-TEA-MLCV": {
   "code": "CMS-TRK-TEA-MLCV",
   "name": "Team Assignment: Machine Learning and Computer Vision",
   "area": "AAI track · team assignment",
   "group": "team",
   "planSem": 2,
   "lp": 10,
   "sws": "",
   "extra": "8 SWS project",
   "pl": 1,
   "desc": "A team project on an optimization problem from machine learning or computer vision. You define an exact or approximate algorithm, analyse its complexity and approximation guarantees, and test it empirically on real data.",
   "coord": "Prof. Dr. Björn Andres",
   "freq": "Every summer semester",
   "exam": "Assignment (60 h)",
   "prereq": "Algorithms, theoretical computer science, analysis, linear algebra, probability and statistics",
   "goals": "Students will be able to work on a complex, research-oriented project that requires expertise from multiple areas of applied artificial intelligence. Students will be able to work in a group to solve a larger, typically interdisciplinary problem in the field of applied artificial intelligence. They will master literature research and the use of scientific information sources and will possess both in-depth subject expertise and extensive methodological and interpersonal skills related to project management and teamwork.",
   "contents": "The module covers the analysis of an optimization problem from the research areas of machine learning and computer vision; the definition and implementation of an algorithm for the exact or approximate solution of this problem; the analysis of this algorithm in terms of its complexity and approximation properties; and the quantitative empirical investigation of this algorithm as applied to concrete data.",
   "links": {}
  },
  "CMS-TRK-TEA-AIH": {
   "code": "CMS-TRK-TEA-AIH",
   "name": "Team Assignment: AI Hardware",
   "area": "AAI track · team assignment",
   "group": "team",
   "planSem": 2,
   "lp": 10,
   "sws": "",
   "extra": "8 SWS project",
   "pl": 1,
   "desc": "A team project that brings a machine-learning problem onto a given accelerator architecture and optimizes it there, for example through sparsity, data flow or quantization. You then measure how each optimization affects the result.",
   "coord": "Prof. Dr. Christian Georg Mayr",
   "freq": "Every summer semester",
   "exam": "Assignment (60 h)",
   "prereq": "Algorithms, linear algebra, accelerator architectures (e.g. from Deep Neural Network Hardware), embedded programming",
   "goals": "Students will be able to work on a complex, research-oriented project that requires expertise from multiple areas of applied artificial intelligence, including hardware-software co-design. Students will be able to work in a group to solve a larger, typically interdisciplinary problem in the field of applied artificial intelligence, particularly the implementation of AI algorithms on a given accelerator architecture. They are proficient in conducting literature reviews and utilizing scientific information sources, and possess both in-depth subject-matter expertise and extensive methodological and interpersonal skills related to project management and teamwork.",
   "contents": "The module covers the analysis of a practical problem from the field of machine learning, as well as the implementation of the algorithm on a given accelerator architecture. It also addresses the optimization of the algorithm for the accelerator—for example, with regard to structural and dynamic sparsity, data flow, or quantization—as well as the implementation and analysis of the optimization in terms of effectiveness and its impact on the problem and application.",
   "links": {}
  },
  "CMS-PRO": {
   "code": "CMS-PRO",
   "name": "Research Assignment",
   "area": "Required course",
   "group": "req",
   "planSem": 3,
   "lp": 15,
   "sws": "",
   "extra": "12 SWS project per year",
   "pl": 1,
   "desc": "An independent research project in computer-aided modeling or simulation. You define a problem, break it into work steps, and design, implement and validate models and simulations for it, then communicate the results.",
   "coord": "Prof. Dr. Martin Weigert",
   "freq": "Every winter semester",
   "exam": "Project assignment (240 h)",
   "prereq": "None",
   "winter": {
    "who": "Michael Färber's research group: Marina Litvak (supervisor)"
   },
   "goals": "Students will master the practical application and implementation of these concepts in an independent research project. They will be able to identify a problem and break it down into work steps that they can tackle independently. They can communicate independently about the project and have mastered the scientific methods of computer modeling—in particular, the design, implementation, and validation of models and simulations—and can apply these to complex application problems.",
   "contents": "The module focuses on a computer-aided modeling or simulation project.",
   "links": {
    "web": "https://faerber-lab.github.io/student-projects-ws2026/"
   },
   "note": "Your research assignment is the project “Context-Aware Code Development with AI Assistance” in Michael Färber's research group, supervised by Marina Litvak (final allocation on 19 Oct, team of four). It looks at how LLM coding assistants can use project context (method descriptions, file and class structure, dependencies and APIs, requirements), e.g. with retrieval-augmented generation; the deliverable is a case-study paper. The study plan schedules the research assignment for semester 3, at 12 SWS per year.",
   "noTimes": "No timetabled sessions; this is project work."
  },
  "EXT-LLM": {
   "code": "EXT-LLM",
   "name": "Behind the Secrets of Large Language Models",
   "area": "Outside the study plan",
   "group": null,
   "lp": null,
   "sws": "",
   "extra": "4 SWS · lectures and exercises",
   "pl": 1,
   "desc": "A practical, in-depth look at how large language models work: their architecture, how they are trained and fine-tuned, how to evaluate what they can and cannot do, and the ethical questions they raise. Theory is paired with hands-on exercises, from implementing attention and transformers to applying LLMs to tasks like summarization and translation.",
   "coord": "Prof. Dr. Michael Färber, Prof. Dr. Simon Razniewski",
   "freq": "Winter semester",
   "exam": "Written exam, 90 min (per the faculty catalogue)",
   "prereq": "Introduction to machine learning, basic neural networks, Python",
   "winter": {
    "who": "Prof. Dr. Michael Färber, Prof. Dr. Simon Razniewski",
    "q": "Behind the Secrets of Large Language Models"
   },
   "goals": "",
   "contents": "",
   "links": {
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/56000479232"
   },
   "note": "Questions go to the OPAL forum; personal matters to behind-the-secrets-of-llms-lecture2627@tu-dresden.de. Not a module of the Applied AI track in this study plan, so it counts toward no requirement there. The faculty catalogue lists it for the Computational Engineering, Life Sciences and Visual Computing tracks.",
   "opalText": "This course provides a practical and in-depth understanding of large language models that power modern natural language processing systems. Students will explore the architecture, training methodologies, capabilities, and ethical implications of LLMs. The course combines theoretical knowledge with hands-on experience to equip students with the skills necessary to develop, analyze, and apply LLMs in various contexts.",
   "schedule": {
    "src": "OPAL (tentative)",
    "lab": true,
    "rows": [
     [
      "2026-10-12",
      "Intro (Razniewski)",
      "Crash course"
     ],
     [
      "2026-10-19",
      "Word representation (Razniewski)",
      "Word representation"
     ],
     [
      "2026-10-26",
      "Neural networks (Färber)",
      "Neural networks"
     ],
     [
      "2026-11-02",
      "Deep Learning + Attention (Färber)",
      "Attention"
     ],
     [
      "2026-11-09",
      "Training data (Razniewski)",
      "Training data"
     ],
     [
      "2026-11-16",
      "Architectures (Färber)",
      "Architectures"
     ],
     [
      "2026-11-23",
      "Training (Razniewski)",
      "Pre-training"
     ],
     [
      "2026-11-30",
      "Transfer learning (Färber)",
      "Fine-tuning"
     ],
     [
      "2026-12-07",
      "Evaluation (Razniewski)",
      "Evaluation"
     ],
     [
      "2026-12-14",
      "Applications (Färber)",
      "Project work"
     ],
     [
      "2027-01-04",
      "RAG (Razniewski)",
      ""
     ],
     [
      "2027-01-11",
      "Vision LMs",
      ""
     ],
     [
      "2027-01-18",
      "Agents I",
      ""
     ],
     [
      "2027-01-25",
      "LLM Knowledge (Razniewski)",
      ""
     ],
     [
      "2027-02-01",
      "Ethics and safety (Razniewski)",
      ""
     ]
    ]
   }
  }
 },
 "sessions": [
  {
   "code": "CMS-COR-HPC",
   "kind": "Lecture",
   "day": 3,
   "start": "09:20",
   "end": "10:50",
   "room": "TOE/A317/H",
   "who": "Prof. Dr. Wolfgang E. Nagel",
   "src": "OPAL (course page and news: starts late, first lecture 21 Oct)",
   "from": "2026-10-21",
   "to": "2027-02-03"
  },
  {
   "code": "CMS-COR-VIZ",
   "kind": "Lecture",
   "day": 3,
   "start": "13:00",
   "end": "14:30",
   "room": "APB/E023/U",
   "who": "Prof. Dr. Raimund Dachselt",
   "src": "course page (mt.inf.tu-dresden.de/lehre/datavis)",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2310",
   "from": "2026-10-14",
   "to": "2027-02-03",
   "labels": {
    "2026-10-14": "Introduction"
   }
  },
  {
   "code": "CMS-COR-VIZ",
   "kind": "Exercise",
   "day": 3,
   "start": "14:50",
   "end": "16:20",
   "room": "APB/E023/U",
   "who": "",
   "src": "course page",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2310",
   "dates": [
    "2026-10-14",
    "2026-11-04",
    "2026-12-02",
    "2026-12-09",
    "2027-01-06",
    "2027-01-27"
   ],
   "labels": {
    "2026-10-14": "E1: Dear Data",
    "2026-11-04": "E2: Multivariate Data",
    "2026-12-02": "E3: Networks",
    "2026-12-09": "E4: Elevation Data",
    "2027-01-06": "E5: Volume Data",
    "2027-01-27": "Closing"
   }
  },
  {
   "code": "CMS-TRK-APSS",
   "kind": "Lecture",
   "day": 2,
   "start": "09:20",
   "end": "10:50",
   "room": "GÖR/0226/H",
   "who": "Dr. Sarah Alice Gaggl",
   "src": "ICCL course page (20 and 27 Oct listed; later Tuesdays assumed weekly)",
   "from": "2026-10-20",
   "to": "2027-02-02",
   "labels": {
    "2026-10-20": "Introduction",
    "2026-10-27": "Informed vs uninformed search"
   }
  },
  {
   "code": "CMS-TRK-APSS",
   "kind": "Tutorial",
   "day": 5,
   "start": "13:00",
   "end": "14:30",
   "room": "APB/E006/U",
   "who": "",
   "src": "ICCL course page (group 2, Fri DS4; only 30 Oct listed, later Fridays assumed weekly)",
   "from": "2026-10-30",
   "to": "2027-02-05",
   "labels": {
    "2026-10-30": "Traditional Search"
   },
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2110"
  },
  {
   "code": "EXT-LLM",
   "kind": "Lecture",
   "day": 1,
   "start": "09:20",
   "end": "10:50",
   "room": "FOE/0244/H",
   "who": "Michael Färber, Simon Razniewski",
   "src": "OPAL"
  },
  {
   "code": "EXT-LLM",
   "kind": "Lab",
   "day": 1,
   "start": "14:50",
   "end": "16:20",
   "room": "APB/E023/U",
   "who": "",
   "src": "OPAL",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2310"
  },
  {
   "code": "CMS-TRK-MLSP",
   "kind": "Lecture",
   "day": 5,
   "start": "09:20",
   "end": "10:50",
   "room": "BAR/I86C/U",
   "who": "Dr.-Ing. Meik Dörpinghaus",
   "src": "OPAL (Termine)",
   "from": "2026-10-16",
   "to": "2027-02-05"
  },
  {
   "code": "CMS-TRK-MLSP",
   "kind": "Exercise",
   "day": 2,
   "start": "09:20",
   "end": "10:50",
   "room": "BAR/I86C/U",
   "who": "",
   "src": "OPAL (Termine)",
   "dates": [
    "2026-10-13",
    "2026-10-27",
    "2026-11-10",
    "2026-11-24",
    "2026-12-08",
    "2027-01-12",
    "2027-01-26"
   ]
  },
  {
   "code": "CMS-TRK-CAI",
   "kind": "Seminar",
   "day": 4,
   "start": "11:10",
   "end": "12:40",
   "room": "APB/E006/U",
   "who": "Charvi Jain",
   "src": "OPAL",
   "from": "2026-10-15",
   "to": "2027-02-06",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2110"
  },
  {
   "code": "CMS-TRK-FCG",
   "kind": "Lecture",
   "day": 1,
   "start": "13:00",
   "end": "14:30",
   "room": "APB/E023/U",
   "who": "Prof. Dr. Stefan Gumhold",
   "src": "catalogue",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2310"
  },
  {
   "code": "CMS-TRK-FCG",
   "kind": "Exercise",
   "day": 5,
   "start": "09:20",
   "end": "10:50",
   "room": "APB/E023/U",
   "who": "Prof. Dr. Stefan Gumhold",
   "src": "catalogue",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2310"
  },
  {
   "code": "CMS-TRK-CRC",
   "kind": "Lecture",
   "day": 3,
   "start": "13:00",
   "end": "14:30",
   "room": "HSZ/0E01",
   "who": "Prof. Dr. Stefanie Speidel",
   "src": "catalogue"
  },
  {
   "code": "CMS-TRK-CRC",
   "kind": "Exercise",
   "day": 3,
   "start": "14:50",
   "end": "16:20",
   "room": "HSZ/0E01",
   "who": "Prof. Dr. Stefanie Speidel",
   "src": "catalogue"
  },
  {
   "code": "CMS-TRK-CV",
   "kind": "Lecture",
   "day": 1,
   "start": "11:10",
   "end": "12:40",
   "room": "HSZ/AUDI/H",
   "who": "Prof. Dr. Björn Andres",
   "src": "OPAL and course page (weekly in the lecture period)",
   "from": "2026-10-12",
   "to": "2027-02-01"
  },
  {
   "code": "CMS-TRK-CV",
   "kind": "Exercise",
   "day": 2,
   "start": "13:00",
   "end": "14:30",
   "room": "SCH/A251",
   "who": "",
   "src": "OPAL (exercise group 1, start 13 Oct)",
   "from": "2026-10-13",
   "to": "2027-02-02"
  },
  {
   "code": "CMS-COR-SAP",
   "kind": "Lecture",
   "day": 1,
   "start": "13:00",
   "end": "14:30",
   "room": "SCH/A117/H",
   "who": "Dr. Nandu Gopan",
   "src": "OPAL (Winter Semester 26/27 notice; first lecture 19 Oct)",
   "from": "2026-10-19",
   "to": "2027-02-01"
  },
  {
   "code": "CMS-COR-SAP",
   "kind": "Exercise",
   "day": 4,
   "start": "13:00",
   "end": "14:30",
   "room": "BEY/0E39/U",
   "who": "Dr. Nandu Gopan",
   "src": "OPAL (Winter Semester 26/27 notice; first exercise date not announced, assumed 22 Oct)",
   "from": "2026-10-22",
   "to": "2027-02-04"
  },
  {
   "code": "CMS-TRK-DLVFA",
   "kind": "Lecture",
   "day": null,
   "start": null,
   "end": null,
   "room": "to be announced",
   "who": "Prof. Dr. Martin Weigert",
   "src": "catalogue"
  },
  {
   "code": "CMS-TRK-DLVFA",
   "kind": "Exercise",
   "day": null,
   "start": null,
   "end": null,
   "room": "to be announced",
   "who": "Prof. Dr. Martin Weigert",
   "src": "catalogue"
  },
  {
   "code": "CMS-TRK-DCD",
   "kind": "Lecture",
   "day": 1,
   "start": "13:00",
   "end": "14:30",
   "room": "TOE/317/H",
   "who": "Prof. Dr. Christian Mayr",
   "src": "chair's WS 2026/27 timetable (from 12 Oct, weekly)",
   "from": "2026-10-12",
   "to": "2027-01-25",
   "extra": [
    {
     "date": "2027-02-01",
     "tentative": true,
     "label": "Reserve date, not announced"
    }
   ]
  },
  {
   "code": "CMS-TRK-DCD",
   "kind": "Exercise",
   "day": 4,
   "start": "09:20",
   "end": "10:50",
   "room": "BAR/0E85/U",
   "who": "Dr.-Ing. Johannes Partzsch, Dipl.-Ing. Jörg Schreiter",
   "src": "chair's WS 2026/27 timetable (Thursday 2nd DS, every 1st week = odd calendar week, from 22 Oct)",
   "dates": [
    "2026-10-22",
    "2026-11-05",
    "2026-11-19",
    "2026-12-03",
    "2026-12-17",
    "2027-01-07",
    "2027-01-21",
    "2027-02-04"
   ]
  },
  {
   "code": "CMS-COR-ML",
   "kind": "Lecture",
   "day": 5,
   "start": "09:20",
   "end": "10:50",
   "room": "TRE/PHYS/E",
   "who": "Prof. Dr. Björn Andres",
   "src": "course page"
  },
  {
   "code": "CMS-COR-ML",
   "kind": "Exercise",
   "day": 2,
   "start": "16:40",
   "end": "18:10",
   "room": "POT/0081/H",
   "who": "",
   "src": "course page",
   "group": "A"
  },
  {
   "code": "CMS-COR-ML",
   "kind": "Exercise",
   "day": 4,
   "start": "14:50",
   "end": "16:20",
   "room": "BAR/SCHÖ/E",
   "who": "",
   "src": "OPAL",
   "group": "B"
  },
  {
   "code": "CMS-TRK-TSP",
   "kind": "Lecture",
   "day": 1,
   "start": "09:20",
   "end": "10:50",
   "room": "BEY/0245/H",
   "who": "Prof. Dr. Roberto Calandra",
   "src": "OPAL (structure page, calendar as of 15 Oct)",
   "from": "2026-10-12",
   "to": "2027-01-18",
   "skip": [
    "2026-10-26"
   ],
   "labels": {
    "2026-10-12": "Lecture 0 + 1",
    "2026-10-19": "Lecture 3",
    "2026-11-02": "Lecture 4",
    "2026-11-09": "Lecture 5",
    "2026-11-16": "Lecture 6",
    "2026-11-23": "Lecture 7",
    "2026-11-30": "Lecture 8",
    "2026-12-07": "Lecture 9",
    "2026-12-14": "Lecture 10",
    "2027-01-04": "Lecture 11",
    "2027-01-11": "Lecture 12",
    "2027-01-18": "Lecture 13: recap and exam preparation"
   },
   "extra": [
    {
     "date": "2026-10-13",
     "room": "BEY/0137/U",
     "label": "Lecture 2"
    }
   ]
  },
  {
   "code": "CMS-TRK-TSP",
   "kind": "Exercise",
   "day": 2,
   "start": "09:20",
   "end": "10:50",
   "room": "APB-E040",
   "who": "Robin Koch",
   "src": "OPAL (structure page, calendar as of 15 Oct)",
   "from": "2026-10-20",
   "to": "2027-01-19",
   "labels": {
    "2026-10-20": "Exercise 1",
    "2026-10-27": "Exercise 3",
    "2026-11-03": "Exercise 4",
    "2026-11-10": "Exercise 5",
    "2026-11-17": "Exercise 6",
    "2026-11-24": "Exercise 7",
    "2026-12-01": "Exercise 8",
    "2026-12-08": "Exercise 9",
    "2026-12-15": "Exercise 10",
    "2027-01-05": "Exercise 11",
    "2027-01-12": "Exercise 12",
    "2027-01-19": "Exercise 13"
   },
   "extra": [
    {
     "date": "2026-10-26",
     "room": "BEY/0245/H",
     "label": "Exercise 2"
    }
   ]
  },
  {
   "code": "CMS-TRK-CSD",
   "kind": "Lab",
   "day": 3,
   "start": "13:00",
   "end": "14:30",
   "room": "TOE 201",
   "who": "Chair of Highly-Parallel VLSI Systems",
   "src": "course page",
   "tentative": true
  }
 ]
};
