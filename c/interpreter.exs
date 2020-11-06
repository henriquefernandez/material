#!/usr/bin/env elixir

partials =
  [
    "base",
    "table",
    "grid",
    "shadow",
    "button",
    "colors",
    "layout",
    "form",
    "thumbnail",
    "normalize",
    "progress",
    "dashboard",
    "tooltip",
    "helpers",
    "tabs",
    "menu",
    "card",
    "chips",
    "nav",
    "alert",
    "modal",
    "footer",
    "collapsible",
    "typography"
  ]

main_content = File.read!(Path.expand("organizer"))

Path.expand("material.css")
|> File.write!(Enum.reduce(partials, main_content, fn p, acc ->
  content = File.read!(Path.expand("material-#{p}.css"))
  String.replace(acc, "->#{p}", content)
end))
