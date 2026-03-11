export type BuilderFieldType = "text" | "textarea" | "url" | "image" | "list";

export type BuilderFieldValue = string | string[];

export type BuilderFieldDefinition = {
  key: string;
  label: string;
  type: BuilderFieldType;
  placeholder?: string;
  rows?: number;
};

export type BuilderSectionDefinition = {
  key: string;
  label: string;
  description?: string;
  fields: BuilderFieldDefinition[];
  defaults: Record<string, BuilderFieldValue>;
};

export type BuilderPageDefinition = {
  id: string;
  label: string;
  sections: BuilderSectionDefinition[];
};

const homepageSections: BuilderSectionDefinition[] = [
  {
    key: "hero",
    label: "Hero",
    fields: [
      { key: "title", label: "Title", type: "textarea", rows: 3 },
      { key: "description", label: "Description", type: "textarea", rows: 4 },
      { key: "ctaLabel", label: "Button Label", type: "text" },
      { key: "ctaHref", label: "Button Link", type: "url" },
      { key: "image", label: "Background Image", type: "image" },
    ],
    defaults: {
      title: "Understanding Disruption.\nShaping Africa's Future.",
      description:
        "The Africa Disruptions Lab is a collaborative research platform dedicated to understanding social, political, economic, and technological disruptions across Africa — and translating evidence into practical, policy-relevant solutions.",
      ctaLabel: "Explore Our Research",
      ctaHref: "/research",
      image: "/images/hero2.jpg",
    },
  },
  {
    key: "about",
    label: "About Section",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "heading", label: "Heading", type: "textarea", rows: 3 },
      { key: "description", label: "Description", type: "textarea", rows: 6 },
      { key: "ctaLabel", label: "Button Label", type: "text" },
      { key: "ctaHref", label: "Button Link", type: "url" },
      { key: "image", label: "Section Image", type: "image" },
    ],
    defaults: {
      sectionTitle: "About Us",
      heading: "Understanding Change,\nDesigning Solutions",
      description:
        "The Africa Disruptions Lab was created to address a growing gap between research and real-world action.\n\nAcross Africa, rapid societal change is often studied after the fact and in isolation. The lab brings together researchers, practitioners, policymakers, and communities to study disruptions as they unfold, identify shared patterns, and co-create solutions grounded in real-world contexts.",
      ctaLabel: "Learn More",
      ctaHref: "/about-us",
      image: "/images/zebra.jpg",
    },
  },
  {
    key: "howWeWork",
    label: "How We Work",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "heading", label: "Heading", type: "textarea", rows: 3 },
      { key: "description", label: "Description", type: "textarea", rows: 4 },
      { key: "step1Title", label: "Step 1 Title", type: "text" },
      { key: "step1Description", label: "Step 1 Description", type: "textarea", rows: 3 },
      { key: "step2Title", label: "Step 2 Title", type: "text" },
      { key: "step2Description", label: "Step 2 Description", type: "textarea", rows: 3 },
      { key: "step3Title", label: "Step 3 Title", type: "text" },
      { key: "step3Description", label: "Step 3 Description", type: "textarea", rows: 3 },
      { key: "step4Title", label: "Step 4 Title", type: "text" },
      { key: "step4Description", label: "Step 4 Description", type: "textarea", rows: 3 },
    ],
    defaults: {
      sectionTitle: "How We Work",
      heading: "A Solutions-Driven\nResearch Approach",
      description:
        "Our methodology is rooted in participatory, action-oriented research. We work directly within real-world settings to ensure that research findings are grounded, relevant, and actionable.",
      step1Title: "Identify Disruptions and\nUnderlying Patterns",
      step1Description:
        "We analyze social and political change across regions to detect recurring mechanisms.",
      step2Title: "Co-Create Research\nwith Stakeholders",
      step2Description:
        "Participants actively shape research questions, methods, and outcomes.",
      step3Title: "Design and Test Pilot\nActions",
      step3Description:
        "Practical initiatives are developed and implemented in real contexts.",
      step4Title: "Translate Evidence into\nPolicy and Practice",
      step4Description:
        "Findings are presented in accessible formats to support informed decision-making.",
    },
  },
  {
    key: "projectsShowcase",
    label: "Projects Showcase Intro",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "heading", label: "Heading", type: "textarea", rows: 3 },
      { key: "description", label: "Description", type: "textarea", rows: 4 },
      { key: "ctaLabel", label: "Button Label", type: "text" },
      { key: "ctaHref", label: "Button Link", type: "url" },
    ],
    defaults: {
      sectionTitle: "Projects",
      heading: "Featured Research and Initiatives",
      description:
        "A selection of current projects and recent outputs that illustrate the lab's focus and approach.",
      ctaLabel: "View All",
      ctaHref: "/projects",
    },
  },
  {
    key: "whyItMatters",
    label: "Why This Work Matters",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "heading", label: "Heading", type: "textarea", rows: 3 },
      { key: "description", label: "Description", type: "textarea", rows: 4 },
      { key: "image", label: "Section Image", type: "image" },
    ],
    defaults: {
      sectionTitle: "Why This Work Matters",
      heading: "Building Resilient Futures",
      description:
        "Societal disruptions rarely occur in isolation. By identifying shared patterns and testing practical responses, the lab supports evidence-based strategies that strengthen resilience, inclusion, and informed policy responses across Africa.",
      image: "/images/homelast.jpg",
    },
  },
];

const aboutSections: BuilderSectionDefinition[] = [
  {
    key: "hero",
    label: "Hero",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "image", label: "Background Image", type: "image" },
    ],
    defaults: {
      title: "ABOUT US",
      image: "/images/about.jpg",
    },
  },
  {
    key: "intro",
    label: "Intro",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "heading", label: "Heading", type: "textarea", rows: 3 },
      { key: "description", label: "Description", type: "textarea", rows: 6 },
      { key: "image1", label: "Image 1", type: "image" },
      { key: "image2", label: "Image 2", type: "image" },
      { key: "image3", label: "Image 3", type: "image" },
    ],
    defaults: {
      sectionTitle: "Intro",
      heading: "About the Africa Futures\nand Disruption Lab",
      description:
        "The Africa Futures and Disruption Lab is a collaborative research platform dedicated to understanding how large-scale social, political, economic, and technological disruptions shape societies across Africa — and how evidence-based responses can be developed in real time.\n\nOur work bridges research, policy, and practice by grounding inquiry in real-world contexts and engaging those most affected by change as active contributors to the research process.",
      image1: "/images/1.jpg",
      image2: "/images/2.jpg",
      image3: "/images/3.jpg",
    },
  },
  {
    key: "missionVision",
    label: "Mission and Vision",
    fields: [
      { key: "missionTitle", label: "Mission Title", type: "text" },
      { key: "missionBody", label: "Mission Body", type: "textarea", rows: 4 },
      { key: "missionImage", label: "Mission Image", type: "image" },
      { key: "missionPoints", label: "Mission Bullet Points", type: "list" },
      { key: "visionTitle", label: "Vision Title", type: "text" },
      { key: "visionBody", label: "Vision Body", type: "textarea", rows: 4 },
    ],
    defaults: {
      missionTitle: "Our Mission",
      missionBody:
        "To contribute to resilient, inclusive, and sustainable futures across Africa through rigorous, collaborative, and action-oriented research.",
      missionImage: "/images/mission.jpg",
      missionPoints: [
        "Understand societal disruptions by identifying shared patterns and mechanisms across contexts",
        "Ground research in real-world settings through participatory and experimental methods",
        "Co-create knowledge with stakeholders directly affected by change",
        "Translate research findings into accessible evidence that informs policy and practice",
      ],
      visionTitle: "Our Vision",
      visionBody:
        "A future in which African societies are better equipped to anticipate disruption, respond collectively, and build inclusive institutions grounded in evidence and lived realities.",
    },
  },
  {
    key: "guidingPrinciples",
    label: "Guiding Principles",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "principle1Title", label: "Principle 1 Title", type: "text" },
      { key: "principle1Description", label: "Principle 1 Description", type: "textarea", rows: 3 },
      { key: "principle2Title", label: "Principle 2 Title", type: "text" },
      { key: "principle2Description", label: "Principle 2 Description", type: "textarea", rows: 3 },
      { key: "principle3Title", label: "Principle 3 Title", type: "text" },
      { key: "principle3Description", label: "Principle 3 Description", type: "textarea", rows: 3 },
      { key: "principle4Title", label: "Principle 4 Title", type: "text" },
      { key: "principle4Description", label: "Principle 4 Description", type: "textarea", rows: 3 },
    ],
    defaults: {
      sectionTitle: "Guiding Principles",
      principle1Title: "Evidence-Based Inquiry",
      principle1Description:
        "Research priorities and interpretations are rooted in African realities and contexts.",
      principle2Title: "Participation and Co-Creation",
      principle2Description:
        "Stakeholders actively shape research questions, methods, and outcomes.",
      principle3Title: "Africa-Centered Perspectives",
      principle3Description:
        "Research priorities and interpretations are grounded in local histories, institutions, and lived experiences.",
      principle4Title: "Transparency and Accessibility",
      principle4Description:
        "Findings are presented in clear and interpretable formats to support broad understanding and use.",
    },
  },
  {
    key: "team",
    label: "Team",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 4 },
      { key: "member1Name", label: "Member 1 Name", type: "text" },
      { key: "member1Role", label: "Member 1 Role", type: "text" },
      { key: "member1Image", label: "Member 1 Image", type: "image" },
      { key: "member1Bio", label: "Member 1 Biography", type: "textarea", rows: 5 },
      { key: "member2Name", label: "Member 2 Name", type: "text" },
      { key: "member2Role", label: "Member 2 Role", type: "text" },
      { key: "member2Image", label: "Member 2 Image", type: "image" },
      { key: "member2Bio", label: "Member 2 Biography", type: "textarea", rows: 5 },
      { key: "member3Name", label: "Member 3 Name", type: "text" },
      { key: "member3Role", label: "Member 3 Role", type: "text" },
      { key: "member3Image", label: "Member 3 Image", type: "image" },
      { key: "member3Bio", label: "Member 3 Biography", type: "textarea", rows: 5 },
      { key: "member4Name", label: "Member 4 Name", type: "text" },
      { key: "member4Role", label: "Member 4 Role", type: "text" },
      { key: "member4Image", label: "Member 4 Image", type: "image" },
      { key: "member4Bio", label: "Member 4 Biography", type: "textarea", rows: 5 },
      { key: "member5Name", label: "Member 5 Name", type: "text" },
      { key: "member5Role", label: "Member 5 Role", type: "text" },
      { key: "member5Image", label: "Member 5 Image", type: "image" },
      { key: "member5Bio", label: "Member 5 Biography", type: "textarea", rows: 5 },
      { key: "member6Name", label: "Member 6 Name", type: "text" },
      { key: "member6Role", label: "Member 6 Role", type: "text" },
      { key: "member6Image", label: "Member 6 Image", type: "image" },
      { key: "member6Bio", label: "Member 6 Biography", type: "textarea", rows: 5 },
    ],
    defaults: {
      sectionTitle: "Our Team",
      description:
        "The Africa Disruptions Lab brings together an interdisciplinary group of researchers, scholars, and collaborators with expertise across social sciences, migration studies, political analysis, and applied research.",
      member1Name: "Coming Soon",
      member1Role: "Coming Soon",
      member1Image: "",
      member1Bio: "",
      member2Name: "Coming Soon",
      member2Role: "Coming Soon",
      member2Image: "",
      member2Bio: "",
      member3Name: "Coming Soon",
      member3Role: "Coming Soon",
      member3Image: "",
      member3Bio: "",
      member4Name: "Coming Soon",
      member4Role: "Coming Soon",
      member4Image: "",
      member4Bio: "",
      member5Name: "Coming Soon",
      member5Role: "Coming Soon",
      member5Image: "",
      member5Bio: "",
      member6Name: "Coming Soon",
      member6Role: "Coming Soon",
      member6Image: "",
      member6Bio: "",
    },
  },
];

const researchSections: BuilderSectionDefinition[] = [
  {
    key: "hero",
    label: "Hero",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "image", label: "Background Image", type: "image" },
    ],
    defaults: {
      title: "RESEARCH",
      image: "/images/projects.jpg",
    },
  },
  {
    key: "intro",
    label: "Intro",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 6 },
    ],
    defaults: {
      sectionTitle: "Intro",
      heading: "Research and Initiatives",
      description:
        "The Africa Disruptions Lab conducts collaborative, solutions-driven research focused on understanding societal disruptions across Africa and translating evidence into practical insights for policy and practice.\n\nOur research combines analytical rigor with participatory methods and real-world experimentation, allowing us to study change as it unfolds and to co-develop responses grounded in lived realities.",
    },
  },
  {
    key: "overview",
    label: "Research Overview",
    fields: [
      { key: "overviewTitle", label: "Overview Title", type: "text" },
      { key: "overviewParagraphs", label: "Overview Paragraphs", type: "list" },
      { key: "questionsTitle", label: "Questions Title", type: "text" },
      { key: "questionsIntro", label: "Questions Intro", type: "textarea", rows: 3 },
      { key: "questionsList", label: "Questions List", type: "list" },
      { key: "contextTitle", label: "Context Title", type: "text" },
      { key: "contextParagraphs", label: "Context Paragraphs", type: "list" },
      { key: "methodologyTitle", label: "Methodology Title", type: "text" },
      { key: "designTitle", label: "Research Design Title", type: "text" },
      { key: "designParagraphs", label: "Research Design Paragraphs", type: "list" },
      { key: "methodsList", label: "Method Steps", type: "list" },
      { key: "designClosing", label: "Design Closing", type: "textarea", rows: 3 },
      { key: "participatoryTitle", label: "Participatory Title", type: "text" },
      { key: "participatoryParagraphs", label: "Participatory Paragraphs", type: "list" },
    ],
    defaults: {
      overviewTitle: "Overview",
      overviewParagraphs: [
        "Digital platforms have become central to contemporary political engagement across Africa, particularly among young people in urban contexts. From social media-driven protest mobilization to new forms of civic participation and political expression, digital technologies are reshaping how political action is organized, communicated, and sustained.",
        "This research project examines the role of digital platforms in shaping youth political mobilization across selected African cities. Rather than focusing on single-country case studies, the project adopts a comparative approach to identify recurring patterns, mechanisms, and outcomes across different political and social contexts.",
        "The study aims to generate evidence that supports informed policy responses to digitally mediated political participation, with particular attention to governance, civic space, and democratic accountability.",
      ],
      questionsTitle: "Key Research Questions",
      questionsIntro: "The project is guided by the following core questions:",
      questionsList: [
        "How do digital platforms shape youth political mobilization and participation in urban African contexts?",
        "What recurring mechanisms link online mobilization to offline political action, such as protests or civic campaigns?",
        "How do political institutions and state actors respond to digitally coordinated forms of participation?",
        "What risks and opportunities do digital platforms create for inclusive political engagement?",
        "How can policy frameworks adapt to evolving forms of digital civic participation?",
      ],
      contextTitle: "Research Context and Rationale",
      contextParagraphs: [
        "Across Africa, urban youth populations are growing rapidly, while access to digital technologies and social media platforms continues to expand. These developments intersect with long-standing political grievances, economic precarity, and demands for accountability.",
        "While digital activism is often portrayed as either transformative or superficial, existing research frequently fails to account for the specific political, institutional, and social contexts in which digital mobilization occurs. Moreover, policy responses to digitally mediated political participation are often reactive and fragmented.",
        "This project responds to these gaps by grounding analysis in real-world contexts and examining digital mobilization as part of broader political ecosystems rather than as an isolated phenomenon.",
      ],
      methodologyTitle: "Methodology",
      designTitle: "Research Design",
      designParagraphs: [
        "The project employs a mixed-methods, participatory research design combining qualitative and comparative analysis.",
        "Key methodological components include:",
      ],
      methodsList: [
        "Comparative case studies across selected African cities",
        "Qualitative interviews with youth activists, organizers, and civic actors",
        "Digital ethnography focusing on platform use and online mobilization practices",
        "Stakeholder workshops involving policymakers, civil society actors, and researchers",
      ],
      designClosing:
        "This design allows for both depth and comparability while ensuring that research remains grounded in lived experience.",
      participatoryTitle: "Participatory Approach",
      participatoryParagraphs: [
        "In line with the lab's commitment to participatory research, youth participants and civic actors are actively involved in shaping research questions, interpreting findings, and identifying policy-relevant implications.",
        "This approach ensures that knowledge production is collaborative and that research outcomes reflect the perspectives of those most directly engaged in political mobilization.",
      ],
    },
  },
];

const projectsSections: BuilderSectionDefinition[] = [
  {
    key: "hero",
    label: "Hero",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "image", label: "Background Image", type: "image" },
    ],
    defaults: {
      title: "PROJECTS",
      image: "/images/projects.jpg",
    },
  },
  {
    key: "intro",
    label: "Intro",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 6 },
    ],
    defaults: {
      sectionTitle: "Intro",
      heading: "Research and Initiatives",
      description:
        "The Africa Disruptions Lab conducts collaborative, solutions-driven research focused on understanding societal disruptions across Africa and translating evidence into practical insights for policy and practice.\n\nOur research combines analytical rigor with participatory methods and real-world experimentation, allowing us to study change as it unfolds and to co-develop responses grounded in lived realities.",
    },
  },
];

const eventsSections: BuilderSectionDefinition[] = [
  {
    key: "hero",
    label: "Hero",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "image", label: "Background Image", type: "image" },
    ],
    defaults: {
      title: "EVENTS",
      image: "/images/projects.jpg",
    },
  },
  {
    key: "intro",
    label: "Intro",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 6 },
    ],
    defaults: {
      sectionTitle: "Intro",
      heading: "Upcoming and Past Events",
      description:
        "Join us for conversations, webinars, and dialogues that engage urgent questions shaping politics and society today.\n\nExplore our events below to understand the future of democracy, governance, and disruption across continents.",
    },
  },
];

const blogSections: BuilderSectionDefinition[] = [
  {
    key: "hero",
    label: "Hero",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "image", label: "Background Image", type: "image" },
      { key: "emptyTitle", label: "Empty State Title", type: "text" },
      { key: "emptyDescription", label: "Empty State Description", type: "textarea", rows: 3 },
    ],
    defaults: {
      title: "BLOG & INSIGHTS",
      image: "",
      emptyTitle: "No blog posts found.",
      emptyDescription: "Check back later for new updates and research insights.",
    },
  },
];

const contactSections: BuilderSectionDefinition[] = [
  {
    key: "hero",
    label: "Hero",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "image", label: "Background Image", type: "image" },
    ],
    defaults: {
      title: "CONTACT US",
      image: "/images/contact.jpg",
    },
  },
  {
    key: "contact",
    label: "Contact Section",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", rows: 3 },
      { key: "generalTitle", label: "General Enquiries Label", type: "text" },
      { key: "generalEmail", label: "General Enquiries Email", type: "text" },
      { key: "emailTitle", label: "Email Label", type: "text" },
      { key: "emailValue", label: "Email Value", type: "text" },
      { key: "phoneTitle", label: "Phone Label", type: "text" },
      { key: "phoneValue", label: "Phone Value", type: "text" },
      { key: "submitLabel", label: "Submit Button Text", type: "text" },
      { key: "bottomImage", label: "Bottom Image", type: "image" },
    ],
    defaults: {
      heading: "Ready to Collaborate?\nLet's connect and Build",
      generalTitle: "General Enquiries",
      generalEmail: "info@africandisruptionslab.org",
      emailTitle: "Email",
      emailValue: "info@africandisruptionslab.org",
      phoneTitle: "Phone Number",
      phoneValue: "+971-5070-8100",
      submitLabel: "Submit",
      bottomImage: "/images/elephants.jpg",
    },
  },
];

export const SITE_PAGE_BUILDERS: Record<string, BuilderPageDefinition> = {
  homepage: {
    id: "homepage",
    label: "Homepage",
    sections: homepageSections,
  },
  about: {
    id: "about",
    label: "About Us",
    sections: aboutSections,
  },
  research: {
    id: "research",
    label: "Research",
    sections: researchSections,
  },
  projects: {
    id: "projects",
    label: "Projects",
    sections: projectsSections,
  },
  events: {
    id: "events",
    label: "Events",
    sections: eventsSections,
  },
  blog: {
    id: "blog",
    label: "Blog",
    sections: blogSections,
  },
  contact: {
    id: "contact",
    label: "Contact",
    sections: contactSections,
  },
};

export function getBuilderPage(pageId: string) {
  return SITE_PAGE_BUILDERS[pageId];
}

export function getBuilderPages() {
  return Object.values(SITE_PAGE_BUILDERS);
}

export function createDefaultPageSections(pageId: string) {
  const page = getBuilderPage(pageId);

  if (!page) {
    return {};
  }

  return Object.fromEntries(
    page.sections.map((section) => [section.key, JSON.parse(JSON.stringify(section.defaults))]),
  ) as Record<string, Record<string, BuilderFieldValue>>;
}

export function normalizeBuilderValue(
  type: BuilderFieldType,
  value: unknown,
  fallback: BuilderFieldValue,
): BuilderFieldValue {
  if (type === "list") {
    if (Array.isArray(value)) {
      return value.map((item) => String(item)).filter(Boolean);
    }

    if (typeof value === "string") {
      return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return Array.isArray(fallback) ? [...fallback] : [];
  }

  if (typeof value === "string") {
    return value;
  }

  return typeof fallback === "string" ? fallback : "";
}
