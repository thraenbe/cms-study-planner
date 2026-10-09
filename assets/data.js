// Shared data for the study organizer (Applied AI track, CMS at TU Dresden).
// Module texts: official module descriptions (goals/contents) and short summaries
// written from them. Sessions: faculty course catalogue for winter 2026/27, corrected
// with course pages where the catalogue had no times ("src": "course page").
// Sessions with start === null have a published day and room but no time yet.
window.CMS = {
 "semester": "Winter 2026/27",
 "updated": "2026-10-09",
 "enrolled": [
  "CMS-COR-HPC",
  "CMS-COR-VIZ",
  "CMS-TRK-APSS",
  "CMS-TRK-CV",
  "CMS-PRO",
  "EXT-LLM",
  "CMS-TRK-CSD"
 ],
 "toRegister": [
  "CMS-TRK-DCD",
  "CMS-TRK-MLSP",
  "CMS-TRK-CAI",
  "CMS-COR-SAP",
  "CMS-COR-SSE",
  "CMS-TRK-HWSWC"
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
   "note": "The course may start late, on 21 October; check the announcements in OPAL. Choose one of the three exercise groups. Slides and exercises are published in OPAL.",
   "schedule": {
    "src": "OPAL",
    "rows": [
     [
      "2026-10-14",
      "Introduction (the course might start late, on 21 Oct)"
     ],
     [
      "2026-10-21",
      "Basics of Parallelism"
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
    "web": "https://mlcv.inf.tu-dresden.de/teaching.html"
   }
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
   "links": {}
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
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/32365445134",
    "opalNote": "This OPAL course is last year's (winter 2025/26); this winter's course may have a new page."
   },
   "register": "Taught this winter as “Stochastic Modeling and Simulation” (Dr. Nandu Gopan). Join the course in OPAL and register for the exam in Selma. Exam: written (90 min), or oral (30 min) if fewer than 10 students take it.",
   "opalText": "This course enable the students to master the basics of stochastic modelling and simulation. The course first discusses discrete-time models, followed by two classic examples, and then goes on to discuss continuous-time models."
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
   "note": "Lectures every Wednesday from 14 October. Exercises run only on six Wednesdays (the room is shared with User Interface Engineering). No session on 18 November (Buß- und Bettag) or 20 December – 3 January. Enrolment in OPAL and for the exam in Selma is open until 15 December 2026.",
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
   "links": {},
   "register": "Required for the Applied AI track. Taught by the Faculty of Electrical Engineering, so its times aren't in the computer-science catalogue: look for the course in OPAL and on the chair's website. Register for the exam in Selma."
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
    "web": "https://mlcv.inf.tu-dresden.de/teaching.html",
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/56313610253"
   },
   "note": "You're in the OPAL course “Computer Vision - Winter 2026/27” (David Stein, Jannik Presberger, Björn Andres). Session times aren't published yet. Register for the exam in Selma."
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
   "links": {},
   "register": "Taught by the Faculty of Electrical Engineering (Dr.-Ing. Meik Dörpinghaus). In OPAL it may appear under its German title, “Maschinelles Lernen in der Signalverarbeitung”. Register for the exam in Selma."
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
   "note": "First lecture on 20 October 2026. Sign up for one tutorial group in OPAL after the first lecture; changes are only announced to registered group members."
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
    "web": "https://jens-lehmann.org/seminars-and-teaching/courses-at-tu-dresden/seminar-conversational-ai/"
   },
   "register": "Seminar by Hon.-Prof. Dr. Jens Lehmann. The seminar page says to register in both Selma and OPAL; the topic list is in the seminar slides."
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
   "note": "Summer-semester module. You are already in its OPAL course; sessions start in the summer semester.",
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
    "web": "https://lasr.org/teaching/"
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
    "who": "Chair of Machine Learning for Computer Vision: Jannik Presberger, Lucas Fabian Naumann, David Stein, Prof. Dr. Björn Andres",
    "q": "CMS Research Project Machine Learning"
   },
   "goals": "Students will master the practical application and implementation of these concepts in an independent research project. They will be able to identify a problem and break it down into work steps that they can tackle independently. They can communicate independently about the project and have mastered the scientific methods of computer modeling—in particular, the design, implementation, and validation of models and simulations—and can apply these to complex application problems.",
   "contents": "The module focuses on a computer-aided modeling or simulation project.",
   "links": {
    "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/56369152004"
   },
   "note": "You're doing your research assignment in the OPAL course “Research Projects Machine Learning (Computer Science) - Winter 26/27” at the Chair of Machine Learning for Computer Vision (Jannik Presberger, Lucas Fabian Naumann, David Stein, Björn Andres). The study plan schedules the research assignment for semester 3, at 12 SWS per year."
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
   "src": "OPAL"
  },
  {
   "code": "CMS-COR-HPC",
   "kind": "Exercise",
   "day": 1,
   "start": "09:20",
   "end": "10:50",
   "room": "online",
   "who": "",
   "src": "OPAL",
   "group": "A"
  },
  {
   "code": "CMS-COR-HPC",
   "kind": "Exercise",
   "day": 2,
   "start": "09:20",
   "end": "10:50",
   "room": "APB/E008/U",
   "who": "",
   "src": "OPAL",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2130",
   "group": "B"
  },
  {
   "code": "CMS-COR-HPC",
   "kind": "Exercise",
   "day": 3,
   "start": "07:30",
   "end": "09:00",
   "room": "TOE/A317/H",
   "who": "",
   "src": "OPAL",
   "group": "C"
  },
  {
   "code": "CMS-COR-VIZ",
   "kind": "Lecture",
   "day": 3,
   "start": "13:00",
   "end": "14:30",
   "room": "APB/E023/U",
   "who": "Prof. Dr. Raimund Dachselt",
   "src": "course page",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2310"
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
   ]
  },
  {
   "code": "CMS-TRK-APSS",
   "kind": "Lecture",
   "day": 2,
   "start": "09:20",
   "end": "10:50",
   "room": "GÖR/0226/H",
   "who": "Dr. Sarah Alice Gaggl",
   "src": "course page"
  },
  {
   "code": "CMS-TRK-APSS",
   "kind": "Tutorial",
   "day": 1,
   "start": "13:00",
   "end": "14:30",
   "room": "APB/E001/U",
   "who": "",
   "src": "course page",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2060",
   "group": "A"
  },
  {
   "code": "CMS-TRK-APSS",
   "kind": "Tutorial",
   "day": 1,
   "start": "16:40",
   "end": "18:10",
   "room": "APB/E001/U",
   "who": "",
   "src": "course page",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2060",
   "group": "B"
  },
  {
   "code": "CMS-TRK-APSS",
   "kind": "Tutorial",
   "day": 4,
   "start": "13:00",
   "end": "14:30",
   "room": "APB/E007/U",
   "who": "",
   "src": "course page",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2120",
   "group": "C"
  },
  {
   "code": "CMS-TRK-APSS",
   "kind": "Tutorial",
   "day": 5,
   "start": "13:00",
   "end": "14:30",
   "room": "APB/E006/U",
   "who": "Dr. Timothy S. Lyon",
   "src": "course page",
   "roomUrl": "https://cis.tu-dresden.de/?campus=TU-DD-HAUPT&building=APB&level=0.0&feature=TU-DD-515-5421-00-2110",
   "group": "D"
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
   "start": null,
   "end": null,
   "room": "HSZ/AUDI/H",
   "who": "Prof. Dr. Björn Andres",
   "src": "catalogue"
  },
  {
   "code": "CMS-TRK-CV",
   "kind": "Exercise",
   "day": 2,
   "start": null,
   "end": null,
   "room": "SCH/A251",
   "who": "Prof. Dr. Björn Andres",
   "src": "catalogue",
   "group": "A"
  },
  {
   "code": "CMS-TRK-CV",
   "kind": "Exercise",
   "day": 4,
   "start": null,
   "end": null,
   "room": "HSZ/0002/E",
   "who": "Prof. Dr. Björn Andres",
   "src": "catalogue",
   "group": "B"
  },
  {
   "code": "CMS-COR-ML",
   "kind": "Lecture",
   "day": 5,
   "start": null,
   "end": null,
   "room": "TRE/PHYS/E",
   "who": "Prof. Dr. Björn Andres",
   "src": "catalogue"
  },
  {
   "code": "CMS-COR-ML",
   "kind": "Exercise",
   "day": 2,
   "start": null,
   "end": null,
   "room": "POT/0081/H",
   "who": "Prof. Dr. Björn Andres",
   "src": "catalogue",
   "group": "A"
  },
  {
   "code": "CMS-COR-ML",
   "kind": "Exercise",
   "day": 4,
   "start": null,
   "end": null,
   "room": "BAR/SCHÖ/E",
   "who": "Prof. Dr. Björn Andres",
   "src": "catalogue",
   "group": "B"
  },
  {
   "code": "CMS-TRK-TSP",
   "kind": "Lecture",
   "day": 2,
   "start": null,
   "end": null,
   "room": "BEY/0137/U",
   "who": "Prof. Dr. Roberto Calandra",
   "src": "catalogue"
  },
  {
   "code": "CMS-TRK-TSP",
   "kind": "Exercise",
   "day": 1,
   "start": null,
   "end": null,
   "room": "BEY/0245/H",
   "who": "Prof. Dr. Roberto Calandra",
   "src": "catalogue"
  },
  {
   "code": "CMS-COR-SAP",
   "kind": "Lecture",
   "day": 1,
   "start": null,
   "end": null,
   "room": "SCH/A117/H",
   "who": "Dr. Nandu Gopan",
   "src": "catalogue"
  },
  {
   "code": "CMS-COR-SAP",
   "kind": "Exercise",
   "day": 4,
   "start": null,
   "end": null,
   "room": "BEY/0E39/U",
   "who": "Dr. Nandu Gopan",
   "src": "catalogue"
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
  }
 ]
};
