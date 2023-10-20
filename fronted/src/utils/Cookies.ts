// // utils.ts
// export function getCookie(name: string): string | null {
//   const value = "; " + document.cookie;
//   const parts = value.split("; " + name + "=");
//   if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
//   return null;
// }

// export function clearCookie(name: string, path: string = '/', domain?: string): void {
//   const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Setting date to past to expire the cookie
//   document.cookie = name + "=;" + expires + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "");
// }
