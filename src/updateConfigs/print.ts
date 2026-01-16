import c from 'ansis'

export function mcpServersConfig(sseUrl: string) {
  const code = c.rgb(206, 145, 120)
  const purple = c.rgb(218, 112, 214)
  return `
${c.yellow`{`}
  ${code`"mcpServers"`}${c.white`:`} ${purple`{`}
    ${code`"uni"`}${c.white`:`} ${c.blue`{`}
      ${code`"url"`}${c.white`:`} ${code`"${sseUrl}"`}
    ${c.blue`}`}
  ${purple`}`}
${c.yellow`}`}
`
}
