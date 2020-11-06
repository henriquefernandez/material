#!/usr/bin/env bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$parent_path"

elixir c/interpreter.exs

uglifycss material.css > material.min.css

yes | cp -rf material.min.css demo/priv/static/css/material.css
