import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(()=>screen.findByText("Message envoyé !"), { timeout: 5000 });
    });
  });

});

const data = {
    events:[{
        "id": 1,
        "type": "conférence",
        "date": "2022-04-29T20:28:45.744Z",
        "title": "User&product MixUsers",
        "cover": "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
        "description": "Présentation des nouveaux usages UX.",
        "nb_guesses": 900,
        "periode": "14-15-16 Avril",
        "prestations": [
            "1 espace d’exposition",
            "1 scéne principale",
            "1 espace de restaurations"
        ]
    },
    {
        "id": 2,
        "type": "expérience digitale",
        "date": "2022-01-29T20:28:45.744Z",
        "title": "#DigitonPARIS",
        "cover": "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
        "description": "Présentation des outils analytics aux professionnels du secteur ",
        "nb_guesses": 1300,
        "periode": "24-25-26 Février",
        "prestations": [
            "1 espace d’exposition",
            "1 scéne principale",
            "1 site web dédié"
        ]
    },
    {
        "id": 3,
        "type": "conférence",
        "date": "2022-03-29T20:28:45.744Z",
        "title": "Conférence &co-responsable",
        "cover": "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
        "description": "Débats et échanges autour des collaborations eco-responsable.",
        "nb_guesses": 600,
        "periode": "24-25-26 Février",
        "prestations": [
            "1 scéne principale",
            "1 espaces de restaurations",
            "1 site web dédié"
        ]
    }],
    focus:[{
        "title": "World economic forum",
        "description": "Oeuvre à la coopération entre le secteur public et le privé.",
        "date": "2022-01-29T20:28:45.744Z",
        "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
    },
    {
        "title": "Nordic design week",
        "description": "Conférences sur le design de demain dans le digital",
        "date": "2022-03-29T20:28:45.744Z",
        "cover": "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png"
    },
    {
        "title": "Sneakercraze market",
        "description": "Rencontres de spécialistes des Sneakers Européens.",
        "date": "2022-05-29T20:28:45.744Z",
        "cover": "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png"
    }]
};

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
        <DataProvider>
            <Home />
        </DataProvider>
    );
    await screen.findAllByText("User&product MixUsers");
    await screen.findByText("#DigitonPARIS");
    await screen.findByText("Conférence &co-responsable");
  })
  it("a list of people card is displayed", async () => {
      render(
          <Home />
      );
      await screen.findAllByTestId("people-card-image-testid")
  })
  it("a footer is displayed", async () => {
      render(
          <Home />
      );
      await screen.findByText("Contactez-nous");
  })
  it("an event card, with the last event, is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      const { container } = render(
          <DataProvider>
              <Home />
          </DataProvider>
      );
      expect(await screen.findAllByText("User&product MixUsers")).toHaveLength(2)
      const s = container.innerHTML;
      const i0 = s.indexOf('Notre dernière prestation');
      expect(i0).not.toBe(-1)
      const i1 = s.indexOf('User&amp;product MixUsers', i0);
      expect(i1).not.toBe(-1)
  })
});
