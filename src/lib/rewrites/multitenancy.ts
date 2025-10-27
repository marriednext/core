export function getHostType(hostHeader: string) {
  const hostWithoutPort = hostHeader.split(":")[0];
  const hostParts = hostWithoutPort.split(".");
  const firstLabel = hostParts[0] || "";

  const hasSubdomain =
    hostParts.length > 2 ||
    (hostParts.length > 1 && hostParts[hostParts.length - 1] === "localhost");
  const isTenantHost =
    hasSubdomain && firstLabel !== "www" && firstLabel !== "admin";

  return { isTenantHost, firstLabel };
}
