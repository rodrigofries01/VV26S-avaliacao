describe("Acessar Globo Esporte", () => {
  it("acesso no site do OneFootball", () => {
    cy.visit("https://onefootball.com/pt-br/inicio");

    // Verifica se o título da página contém "OneFootball"
    cy.get("h1").should("contain.text", "OneFootball").wait(1000);

    // Clicar no botão de aceitar cookies
    cy.get("#onetrust-accept-btn-handler").click();

    //Selecionar tela de times
    cy.get(":nth-child(2) > .Header_headerNavButtonButton__pC1Pp").click();
    // Verifica se o título da página contém "Times"
    cy.get(".SubNav_subNavContainer__6U49B > :nth-child(1) > .title-8-regular")
      .should("contain.text", "Os times mais seguidos no seu país")
      .wait(1000);

    // selecionando time do Gremio
    cy.get(
      ".SubNavSection_list__wrFOe > :nth-child(2) > ul > :nth-child(1)"
    ).click();

    // clique fora da pagagina para fechar o menu
    cy.get("body").click(0, 0);
    cy.get(".EntityTitle_container__I4681").click();
    // Verifica se o título da página contém "Grêmio"
    cy.get(".EntityTitle_container__I4681")
      .should("contain.text", "Grêmio")
      .wait(1000);

    //clica na opcao de jugos da equipe
    cy.get(":nth-child(3) > .PageTabs_link___0SlV").click();

    // Verifica se o título da página contém "Jogos"
    cy.get(
      ".XpaLayout_xpaLayoutContainerComponentResolver__jwpy6 > .title-5-bold"
    )
      .should("contain.text", "Calendário da temporada")
      .wait(1000);

    //clicar entrar no primeiro jogo
    cy.get(
      ":nth-child(1) > .grid > :nth-child(1) > .MatchCard_matchCard__iOv4G > .SimpleMatchCard_simpleMatchCard__yTuUP > .SimpleMatchCard_simpleMatchCard__content__ZWt2p"
    ).click();

    // Verifica se o título da página contém "detalhes do jogo"
    cy.get(".MatchInfo_wrapper__g9O4s > .title-7-bold")
      .should("contain.text", "Detalhes do jogo")
      .wait(1000);
  });
});
