package render

import (
	"bytes"
	"log"
	"net/http"
	"path/filepath"
	"text/template"

	"github.com/Duch003/BedAndBreakfastGo/pkg/config"
	"github.com/Duch003/BedAndBreakfastGo/pkg/models"
)

var appConfig *config.AppConfig
var layoutsPath = "./templates/*.layout.tmpl"
var pagesPath = "./templates/*.page.tmpl"
var functions = template.FuncMap {

}

func NewRender(a *config.AppConfig) {
	appConfig = a
}

func AddDefaultData(templateData *models.TemplateData) *models.TemplateData {
	return templateData
}

func RenderTemplate(responseWriter http.ResponseWriter, templateName string, templateData *models.TemplateData) {
	var templateCache map[string]*template.Template
	if appConfig.UseCache {
		templateCache = appConfig.TemplateCache
	} else {
		templateCache, _ = CreateTemplateCache()
	}

	template, exist := templateCache[templateName]
	if !exist {
		log.Fatal("No such template:", templateName)
	}

	buffer := new(bytes.Buffer)
	templateData = AddDefaultData(templateData)
	_ = template.Execute(buffer, templateData)
	_, err := buffer.WriteTo(responseWriter)
	if err != nil {
		log.Fatal("Error writing template to the browser:", err)
	}
}

func CreateTemplateCache() (map[string]*template.Template, error) {
	output := map[string]*template.Template{}

	pages, err := filepath.Glob(pagesPath)
	if err != nil {
		return output, err
	}

	for _, page := range pages {
		pageName := filepath.Base(page)
		templateSet, err := template.New(pageName).Funcs(functions).ParseFiles(page)
		if err != nil {
			return output, err
		}

		matchesTemplates, err := filepath.Glob(layoutsPath)
		if err != nil {
			return output, err
		}

		if len(matchesTemplates) > 0 {
			templateSet, err = templateSet.ParseGlob(layoutsPath)
			if err != nil {
				return output, err
			}
		}

		output[pageName] = templateSet
	}

	return output, nil
}