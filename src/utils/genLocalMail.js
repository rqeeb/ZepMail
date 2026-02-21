export function genLocalMail() {
  const user = Math.random().toString(36).slice(2, 10);
  return `${user}@mails.zepmail.xyz`;
}
