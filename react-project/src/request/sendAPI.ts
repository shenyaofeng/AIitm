import httpInstance from "../utils/http";

export function sendContent() {
  return httpInstance({
    url: "/aicompletions",
    method: "POST",
  });
}
