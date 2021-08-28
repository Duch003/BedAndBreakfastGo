package config

import (
	"text/template"

	"github.com/alexedwards/scs/v2"
)

type AppConfig struct {
	UseCache      bool
	IsDevelopment bool
	TemplateCache map[string]*template.Template
	Session *scs.SessionManager
}