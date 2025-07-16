# Team Sites Web Part

This project is a SharePoint Framework (SPFx) web part that dynamically displays all the Microsoft 365 Team Sites the currently logged-in user is a member of.

It integrates into SharePoint modern pages and can be deployed to your tenant’s app catalog.

---

## ⚙️ Requirements

- Node.js **v18.17.1** or higher (but lower than v19.0.0)
- SharePoint Framework (SPFx) **v1.18.2** or compatible
- Gulp **v4.0.2**
- Yeoman generator `@microsoft/sharepoint`

---

## 🛠 Installation

Clone the repository:

```
git clone https://github.com/goodiee/team-sites-webpart.git
cd team-sites-webpart
```

Install dependencies:

```
npm install
```

## 🔧 Running the Project Locally

Run the local dev server:

`gulp serve`

Then open your SharePoint Workbench page:

`https://<your-tenant>.sharepoint.com/_layouts/15/workbench.aspx`

! Note: The tenant workbench URL is defined in:

`config/serve.json`

If prompted with certificate errors, run:

`gulp trust-dev-cert`

