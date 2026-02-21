export type ProgramStream = "computer-science" | "mechanical" | "electrical" | "civil";

export interface DaadProgram {
  id: string;
  title: string;
  university: string;
  location: string;
  daadUrl: string;
  universityUrl: string;
}

export const streamLabels: Record<ProgramStream, string> = {
  "computer-science": "Computer Science",
  mechanical: "Mechanical",
  electrical: "Electrical",
  civil: "Civil"
};

export const streamOrder: ProgramStream[] = ["computer-science", "mechanical", "electrical", "civil"];

export const daadProgramsByStream: Record<ProgramStream, DaadProgram[]> = {
  "computer-science": [
    {
      id: "cs-stuttgart-4439",
      title: "Computer Science (MSc)",
      university: "University of Stuttgart",
      location: "Stuttgart",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4439/",
      universityUrl: "https://www.uni-stuttgart.de/en/"
    },
    {
      id: "cs-fresenius-9954",
      title: "Computer Science (MSc)",
      university: "Hochschule Fresenius - University of Applied Sciences",
      location: "Berlin",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9954/",
      universityUrl: "https://www.hs-fresenius.com/"
    },
    {
      id: "cs-konstanz-10588",
      title: "Computer Science for Industry and Business (MSc COSIB)",
      university: "University of Konstanz",
      location: "Konstanz",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/10588/",
      universityUrl: "https://www.uni-konstanz.de/en/"
    },
    {
      id: "cs-rub-9673",
      title: "Computer Science MSc",
      university: "Ruhr University Bochum",
      location: "Bochum",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9673/",
      universityUrl: "https://www.ruhr-uni-bochum.de/en"
    }
  ],
  mechanical: [
    {
      id: "me-tud-10519",
      title: "Mechanical Engineering (Maschinenbau)",
      university: "Technical University of Darmstadt",
      location: "Darmstadt",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/10519/",
      universityUrl: "https://www.tu-darmstadt.de/"
    },
    {
      id: "me-thl-4352",
      title: "Mechanical Engineering, MSc",
      university: "Technische Hochschule Luebeck",
      location: "Luebeck",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4352/",
      universityUrl: "https://www.th-luebeck.de/en/"
    },
    {
      id: "me-rptu-3946",
      title: "Master of Science in Commercial Vehicle Technology",
      university: "RPTU University Kaiserslautern-Landau",
      location: "Kaiserslautern",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/3946/",
      universityUrl: "https://rptu.de/en"
    }
  ],
  electrical: [
    {
      id: "ee-stuttgart-6926",
      title: "Electrical Engineering",
      university: "University of Stuttgart",
      location: "Stuttgart",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/6926/",
      universityUrl: "https://www.uni-stuttgart.de/en/"
    },
    {
      id: "ee-ovgu-6091",
      title: "Electrical Engineering and Information Technology",
      university: "Otto von Guericke University Magdeburg",
      location: "Magdeburg",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/6091/",
      universityUrl: "https://www.ovgu.de/en/"
    },
    {
      id: "ee-paderborn-7607",
      title: "Master of Science in Electrical Systems Engineering",
      university: "Paderborn University",
      location: "Paderborn",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/7607/",
      universityUrl: "https://www.uni-paderborn.de/en/"
    },
    {
      id: "ee-rwth-5227",
      title: "Systems and Automation (Major in EEIT)",
      university: "RWTH Aachen University",
      location: "Aachen",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/5227/",
      universityUrl: "https://www.rwth-aachen.de/go/id/a/?lidx=1"
    }
  ],
  civil: [
    {
      id: "ce-tud-8333",
      title: "MSc Civil Engineering - Bauingenieurwesen",
      university: "Technical University of Darmstadt",
      location: "Darmstadt",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/8333/",
      universityUrl: "https://www.tu-darmstadt.de/"
    },
    {
      id: "ce-rwth-6318",
      title: "Advanced Computational Methods in Civil Engineering",
      university: "RWTH Aachen University",
      location: "Aachen",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/6318/",
      universityUrl: "https://www.rwth-aachen.de/go/id/a/?lidx=1"
    },
    {
      id: "ce-tum-10394",
      title: "Civil Engineering (MSc)",
      university: "Technical University of Munich",
      location: "Munich",
      daadUrl: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/10394/",
      universityUrl: "https://www.tum.de/en/"
    }
  ]
};
