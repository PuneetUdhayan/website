import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ARTICLES = [
  {
    filename: "ai-governance-slackbot.md",
    title: "Bringing AI Governance Into Slack",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7480895068695097344/",
    paragraphs: [
      "Registering a new AI use case for compliance review usually means leaving the tools a team already lives in. I built a Slack bot on top of IBM watsonx.governance that lets people register a use case and get its risks mapped through a normal chat conversation instead.",
      "The bigger idea: governance sticks when it's part of the workflow, not a separate portal nobody opens until an audit forces them to.",
    ],
  },
  {
    filename: "task-credentials-for-async-jobs.md",
    title: "Securing Jobs That Outlive Your Login",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7359434374955585536/",
    paragraphs: [
      "User tokens expire in minutes; some background jobs run for hours or days. The common fix — a static service token with broad access — is really just a master key wearing a disguise.",
      "I designed a 'Task Credentials' pattern instead: short-lived, narrowly scoped credentials that delegate a user's authority for exactly as long as a specific job needs it, so a leaked credential exposes one task, not the whole system.",
    ],
  },
  {
    filename: "no-code-food-waste-tracker.md",
    title: "I Automated My Way Out of Wasting Groceries",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7378471712339759104/",
    paragraphs: [
      "I was throwing out too much food, so I built a pipeline that reads grocery delivery emails (Swiggy Instamart, Zomato), uses an LLM to pull out the items and estimate shelf life, and reminds me before anything goes bad.",
      "The whole thing came together in a few hours in n8n without writing a line of code — a good reminder of how much ground automation platforms plus LLMs now cover.",
    ],
  },
  {
    filename: "bug-report-chrome-extension.md",
    title: "A Chrome Extension That Files Bugs For You",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7367627166798266369/",
    paragraphs: [
      "Filing a bug used to mean leaving the page, digging up notes, finding the right GitHub repo, screenshotting, and writing it all up by hand. I built an extension that captures the screenshot automatically and lets you just type what went wrong.",
      "An LLM figures out which repository the bug belongs to and drafts the GitHub issue, with a chat interface to add detail before it's filed. Small scope, disproportionate time saved.",
    ],
  },
  {
    filename: "crema-uml-generator.md",
    title: "Crema: UML Diagrams That Don't Go Stale",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7425519336422887424/",
    paragraphs: [
      "Documentation drifts from the code it describes almost immediately unless generating it is basically free. Crema is an open-source tool that parses Java source with JavaParser and produces UML diagrams — PlantUML, SVG, or PNG — automatically.",
      "It resolves types and detects relationships across large codebases, which makes it useful for code review and onboarding without asking anyone to hand-draw a diagram that's outdated by the next release.",
    ],
  },
  {
    filename: "fastapi-inroute.md",
    title: "fastapi-inroute: Real Webhooks On Your Laptop",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7421439300376076288/",
    paragraphs: [
      "Testing webhook integrations locally usually means a tunneling service, a second codebase for the local receiver, or both. fastapi-inroute forwards real webhook payloads from a test deployment straight to your local machine using the same server code.",
      "That means real payloads, breakpoints that actually work, and a five-minute setup — install with pip install fastapi-inroute.",
    ],
  },
];

const ITEMS = ARTICLES.map((a) => ({ filename: a.filename, article: a })).sort(
  (a, b) => a.filename.localeCompare(b.filename),
);

function formatLoginDate() {
  const d = new Date(Date.now() - 1000 * 60 * 60 * 20);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const pad = (n) => String(n).padStart(2, "0");
  return `${days[d.getDay()]} ${months[d.getMonth()]} ${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function getRows(width, total) {
  if (width < 640) return total;
  if (width < 1024) return Math.ceil(total / 2);
  return Math.ceil(total / 4);
}

function TypedText({ text, speed = 20, onDone, cursor = false }) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (count >= text.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    const id = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, text, speed]);

  return (
    <span>
      {text.slice(0, count)}
      {cursor && count < text.length && <span className="terminal-cursor" />}
    </span>
  );
}

function RevealArticle({ article }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const lines = ref.current?.querySelectorAll(".article-line");
      if (!lines) return;
      gsap.fromTo(
        lines,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power1.out" },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mt-3 max-w-2xl">
      <div className="article-line text-[#eafff0] mb-4">{article.title}</div>
      {article.paragraphs.map((p, i) => (
        <p key={i} className="article-line mb-4 leading-relaxed opacity-90">
          {p}
        </p>
      ))}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="article-line inline-block text-[8px] sm:text-[9px] underline underline-offset-4 opacity-70 hover:opacity-100 hover:text-[#eafff0]"
      >
        → read the full post on LinkedIn
      </a>
    </div>
  );
}

function HistoryEntry({ item }) {
  const [typed, setTyped] = useState(false);
  const handleDone = useCallback(() => setTyped(true), []);

  return (
    <div className="mb-6">
      <div>
        <span className="text-[#8be28b]">puneet@Puneets-MacBook-Pro ~ %</span>{" "}
        <TypedText
          text={`cat ${item.filename}`}
          speed={22}
          onDone={handleDone}
          cursor={!typed}
        />
      </div>
      {typed && <RevealArticle article={item.article} />}
    </div>
  );
}

function Tech() {
  const screenRef = useRef(null);
  const scrollRef = useRef(null);
  const listingRef = useRef(null);
  const idRef = useRef(0);

  const [screenOn, setScreenOn] = useState(false);
  const [loginDone, setLoginDone] = useState(false);
  const [lsStart, setLsStart] = useState(false);
  const [lsDone, setLsDone] = useState(false);
  const [listingShown, setListingShown] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const [promptReady, setPromptReady] = useState(false);
  const [history, setHistory] = useState([]);
  const [rows, setRows] = useState(() =>
    getRows(typeof window !== "undefined" ? window.innerWidth : 1440, ITEMS.length),
  );

  const loginLine = useMemo(() => `Last login: ${formatLoginDate()} on ttys001`, []);

  // Old-TV power-on: squash to a thin bright line, then snap open and
  // settle brightness — the boot sequence only starts once this finishes.
  useGSAP(() => {
    gsap.set(screenRef.current, {
      scaleY: 0.015,
      opacity: 1,
      filter: "brightness(8)",
    });
    const tl = gsap.timeline({ onComplete: () => setScreenOn(true) });
    tl.to(screenRef.current, { scaleY: 0.015, duration: 0.4 })
      .to(screenRef.current, { scaleY: 1, duration: 0.35, ease: "power2.out" })
      .to(
        screenRef.current,
        { filter: "brightness(1)", duration: 0.5, ease: "power1.out" },
        "-=0.2",
      );
  }, []);

  useEffect(() => {
    function onResize() {
      setRows(getRows(window.innerWidth, ITEMS.length));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(
    () => {
      if (!listingShown) return;
      const nodes = listingRef.current?.querySelectorAll(".ls-item");
      if (!nodes) return;
      gsap.fromTo(
        nodes,
        { opacity: 0, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.02,
          ease: "power1.out",
          onComplete: () => setHintShown(true),
        },
      );
    },
    { dependencies: [listingShown] },
  );

  useEffect(() => {
    if (!hintShown) return;
    const t = setTimeout(() => setPromptReady(true), 300);
    return () => clearTimeout(t);
  }, [hintShown]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, listingShown, hintShown, promptReady, lsStart]);

  const handleLoginDone = useCallback(() => {
    setLoginDone(true);
    setTimeout(() => setLsStart(true), 400);
  }, []);

  const handleLsDone = useCallback(() => {
    setLsDone(true);
    setTimeout(() => setListingShown(true), 200);
  }, []);

  function openFile(item) {
    idRef.current += 1;
    setHistory((h) => [...h, { id: idRef.current, ...item }]);
  }

  return (
    <div className="h-dvh overflow-hidden bg-[#fdfdfc] flex flex-col items-center justify-center px-4 sm:px-10 pt-24 pb-8 sm:pt-28 sm:pb-10">
      <div
        ref={screenRef}
        className="terminal-flicker relative w-full max-w-5xl h-full sm:h-[70vh] bg-[#141414] overflow-hidden"
        style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.6)" }}
      >
        <div className="terminal-scanlines pointer-events-none absolute inset-0 z-10" />
        <div
          ref={scrollRef}
          className="relative h-full overflow-y-auto p-5 sm:p-8 font-terminal text-[9px] sm:text-[11px] leading-loose text-[#4af626]"
          style={{ textShadow: "0 0 6px rgba(74,246,38,0.35)" }}
        >
          {screenOn && (
            <div className="mb-6">
              <TypedText
                text={loginLine}
                speed={16}
                onDone={handleLoginDone}
                cursor={!loginDone}
              />
            </div>
          )}

          {loginDone && (
            <div>
              <span className="text-[#8be28b]">puneet@Puneets-MacBook-Pro ~ %</span>{" "}
              {lsStart && (
                <TypedText text="ls" speed={100} onDone={handleLsDone} cursor={!lsDone} />
              )}
            </div>
          )}

          {listingShown && (
            <div
              ref={listingRef}
              className="mt-4 grid grid-flow-col gap-x-8 gap-y-1.5"
              style={{ gridTemplateRows: `repeat(${rows}, auto)` }}
            >
              {ITEMS.map((item) => (
                <button
                  key={item.filename}
                  type="button"
                  onClick={() => openFile(item)}
                  className="ls-item block text-left justify-self-start py-0.5 cursor-pointer hover:text-[#eafff0] hover:underline underline-offset-4"
                >
                  {item.filename}
                </button>
              ))}
            </div>
          )}

          {hintShown && (
            <div className="mt-5 opacity-50"># tip: click a file to open it</div>
          )}

          <div className="mt-6">
            {history.map((item) => (
              <HistoryEntry key={item.id} item={item} />
            ))}
          </div>

          {promptReady && (
            <div>
              <span className="text-[#8be28b]">puneet@Puneets-MacBook-Pro ~ %&nbsp;</span>
              <span className="terminal-cursor" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tech;

// Made with Bob
