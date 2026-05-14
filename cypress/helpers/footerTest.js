export default class Footer {
  get footer_root() {
    return cy.get('app-footer footer.footer');
  }
  get footer_left() {
    return cy.get('app-footer footer.footer .footer_item.-left');
  }

  get copyright_text() {
    return cy.get('app-footer footer.footer .footer_item.-left p').eq(0);
  }

  get description_text() {
    return cy.get('app-footer footer.footer .footer_item.-left p').eq(1);
  }

  get footer_right() {
    return cy.get('app-footer footer.footer .footer_item.-right');
  }

  get footer_logo() {
    return cy.get('app-footer footer.footer a.footer_logo');
  }

  get footer_logo_svg() {
    return cy.get('app-footer footer.footer a.footer_logo svg');
  }
}
