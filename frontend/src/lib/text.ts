export function withPeriod(text: string) {
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}

const learnerVerbs: Record<string, string> = {
  addresses: "address",
  asks: "ask",
  avoids: "avoid",
  centers: "center",
  checks: "check",
  chooses: "choose",
  considers: "consider",
  creates: "create",
  demonstrates: "demonstrate",
  does: "do",
  "doesn't": "don't",
  fails: "fail",
  follows: "follow",
  has: "have",
  "hasn't": "haven't",
  identifies: "identify",
  involves: "involve",
  is: "are",
  "isn't": "aren't",
  names: "name",
  notices: "notice",
  offers: "offer",
  recognizes: "recognize",
  respects: "respect",
  responds: "respond",
  shows: "show",
  supports: "support",
  takes: "take",
  uses: "use",
  was: "were",
  "wasn't": "weren't",
};

const learnerVerbPattern = "addresses|asks|avoids|centers|checks|chooses|considers|creates|demonstrates|does|doesn't|fails|follows|has|hasn't|identifies|involves|is|isn't|names|notices|offers|recognizes|respects|responds|shows|supports|takes|uses|was|wasn't";

export function directAddress(text: string) {
  return (text.match(/[^.!?]+[.!?]*\s*/g) ?? [text]).map(addressSegment).join("");
}

function addressSegment(segment: string) {
  const learnerWasSubject = /^\s*the (?:user|learner)\b/i.test(segment);
  const addressed = segment
    .replace(/\bthe (?:user|learner)[’']s\b/gi, (match) => match[0] === "T" ? "Your" : "your")
    .replace(/\bthe (?:user|learner)\b/gi, (match) => match[0] === "T" ? "You" : "you");

  const agreed = addressed
    .replace(
      new RegExp(`\\byou\\s+(${learnerVerbPattern})\\b`, "gi"),
      (match, verb: string) => `${match.startsWith("You") ? "You" : "you"} ${learnerVerbs[verb.toLowerCase()]}`,
    );

  return learnerWasSubject
    ? agreed.replace(
      new RegExp(`\\b(and|but|then)\\s+(${learnerVerbPattern})\\b`, "gi"),
      (_match, connector: string, verb: string) => `${connector} ${learnerVerbs[verb.toLowerCase()]}`,
    )
    : agreed;
}
