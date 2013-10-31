bb_jqm_rjs
==========

Backbone + jQuery Mobile + RequireJS app



A savoir :

$.mobile.activePage.attr(); Ne fonctionne pas au "pageinit", il faut que la page soit déjà "chargée" (fonctionne pour sur au pageshow())

changePage() Ne fonctionne QUE SI la CSS de jQuery Mobile est chargée (Surement parce que l'effet de transition est fait en CSS - j'imagine !)