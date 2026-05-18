import BaseURL from '../helpers/BaseURL.js';
import Footer from '../helpers/footerTest.js';
import Header from '../helpers/headerTest.js';

describe('Homepage and Login Tests', () => {
  const header = new Header();
  const footer = new Footer();

  beforeEach(() => {
    cy.visitWithAuth(BaseURL.baseUrl);
  });

  describe('Header Elements Tests', () => {
    it('should display header root with dark background', () => {
      header.header_root.should('be.visible').and('have.class', 'bg-basic-dark');
    });

    it('should display header logo with href="/"', () => {
      header.header_logo
        .should('be.visible')
        .and('have.attr', 'href', '/')
        .and('have.attr', 'routerlink', '/');
    });

    it('should display home navigation link as active', () => {
      header.btn_home
        .should('be.visible')
        .and('have.class', '-active')
        .and('have.attr', 'href', '/')
        .and('contain.text', 'Home');
    });

    it('should display about navigation button', () => {
      header.btn_about.should('be.visible').and('contain.text', 'About');
    });

    it('should display contact navigation button', () => {
      header.btn_contact.should('be.visible').and('contain.text', 'Contacts');
    });

    it('should display guest log in button', () => {
      header.btn_guest_login
        .should('be.visible')
        .and('have.class', '-guest')
        .and('contain.text', 'Guest log in');
    });

    it('should display sign in button', () => {
      header.btn_sign_in
        .should('be.visible')
        .and('have.class', 'btn-outline-white')
        .and('contain.text', 'Sign In');
    });
  });

  describe('Header Navigation Tests', () => {
    it('should stay on / when clicking header logo', () => {
      header.header_logo.click();
      cy.location('pathname').should('eq', '/');
    });

    it('should stay on / when clicking home button', () => {
      header.btn_home.click();
      cy.location('pathname').should('eq', '/');
      header.btn_home.should('have.class', '-active');
    });

    it('should scroll toward #aboutSection when clicking about button', () => {
      cy.window()
        .its('scrollY')
        .then((initialScroll) => {
          header.btn_about.click();
          cy.wait(700);
          cy.window().its('scrollY').should('be.greaterThan', initialScroll);
          header.about_section
            .should('be.visible')
            .and('have.attr', 'id', 'aboutSection')
            .and('contain.text', 'Log fuel expenses');
        });
    });

    it('should scroll toward #contactsSection when clicking contacts button', () => {
      cy.window()
        .its('scrollY')
        .then((initialScroll) => {
          header.btn_contact.click();
          cy.wait(700);
          cy.window().its('scrollY').should('be.greaterThan', initialScroll);
          header.contacts_section
            .should('be.visible')
            .and('have.attr', 'id', 'contactsSection')
            .and('contain.text', 'ithillel.ua');
        });
    });

    it('should authenticate as guest and redirect to /panel/* when clicking guest log in', () => {
      header.btn_guest_login.click();
      cy.location('pathname', { timeout: 15000 }).should('include', '/panel');
      cy.get('app-header').should('contain.text', 'Garage');
    });
  });

  describe('Sign In Modal Tests', () => {
    beforeEach(() => {
      header.btn_sign_in.click();
    });

    it('should open sign in modal with correct title', () => {
      header.signin_modal.should('be.visible');
      header.signin_modal_title.should('have.text', 'Log in');
    });

    it('should display email and password input fields', () => {
      header.signin_input_email.should('be.visible').and('have.attr', 'type', 'text');
      header.signin_input_password.should('be.visible').and('have.attr', 'type', 'password');
    });

    it('should display Login and Registration buttons in modal', () => {
      header.signin_modal.within(() => {
        cy.contains('button', 'Login').should('be.visible');
        cy.contains('button', 'Registration').should('be.visible');
      });
    });

    it('should close modal when clicking close (X) button', () => {
      header.signin_modal_close.click();
      cy.get('ngb-modal-window').should('not.exist');
    });
  });

  describe('Footer Elements Tests', () => {
    beforeEach(() => {
      footer.footer_root.scrollIntoView();
    });

    it('should display footer root with flex layout', () => {
      footer.footer_root
        .should('be.visible')
        .and('have.class', 'd-flex')
        .and('have.class', 'align-items-center');
    });

    it('should display copyright text', () => {
      footer.copyright_text
        .should('be.visible')
        .invoke('text')
        .then((t) => expect(t.trim()).to.eq('© 2021 Hillel IT school'));
    });

    it('should display description text', () => {
      footer.description_text
        .should('be.visible')
        .invoke('text')
        .then((t) =>
          expect(t.trim()).to.eq(
            'Hillel auto developed in Hillel IT school for educational purposes of QA courses.',
          ),
        );
    });

    it('should display footer logo with href="/"', () => {
      footer.footer_logo.should('be.visible').and('have.attr', 'href', '/');
      footer.footer_logo_svg.should('exist');
    });
  });

  describe('Footer Navigation Tests', () => {
    it('should navigate to / when clicking footer logo', () => {
      footer.footer_logo.scrollIntoView().click();
      cy.location('pathname').should('eq', '/');
      header.header_root.should('be.visible');
    });
  });
});
