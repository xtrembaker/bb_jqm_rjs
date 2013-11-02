bb_jqm_rjs
==========

Backbone + jQuery Mobile + RequireJS app



A savoir :

$.mobile.activePage.attr(); Ne fonctionne pas au "pageinit", il faut que la page soit déjà "chargée" (fonctionne pour sur au pageshow())

Comment fonctionne changePage():
- La CSS de jQuery Mobile DOIT être chargé
- la page appelé DOIT contenir un data-role="page"
- Ne pas utiliser changePage sur un $(document).bind('pageinit') car l'événement serait appelé 2 fois (une fois au chargement de l'url, une autre fois au chargement du changePage()). Vous pouvez toutefois l'utiliser sur un élément
