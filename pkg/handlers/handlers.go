package handlers

import (
	"net/http"

	"github.com/Duch003/BedAndBreakfastGo/pkg/config"
	"github.com/Duch003/BedAndBreakfastGo/pkg/models"
	"github.com/Duch003/BedAndBreakfastGo/pkg/render"
)

type Repository struct {
	AppConfig *config.AppConfig
}

func NewRepository(appConfig *config.AppConfig) *Repository {
	return &Repository{
		AppConfig:  appConfig,
	}
}

var Repo *Repository

func NewHandlers(repository *Repository) {
	Repo = repository
}

func (repoReceiver *Repository)Home(responseWriter http.ResponseWriter, request *http.Request) {
	render.RenderTemplate(responseWriter, "home.page.tmpl", &models.TemplateData{})
}

func (repoReceiver *Repository)About(responseWriter http.ResponseWriter, request *http.Request) {
	render.RenderTemplate(responseWriter, "about.page.tmpl", &models.TemplateData{})
}
