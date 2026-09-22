import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { Reveal, useIsMobile } from "@/components/Site";
import { skickaHandelse } from "@/lib/analytics";

// ============================================================================
// SYSTEMKOLLEN — besökaren anger sina RIKTIGA system, låser upp
// resultatet med ett kort formulär (lead till Netlify Forms "systemkollen")
// och får kartan som förslag: systemen ordnade kring affären med
// regelbaserade kopplingar som förklarar sig vid hover/tryck.
// Deterministiskt, ingen AI-tjänst, ingen backend utöver Netlify Forms.
// ============================================================================

type Kategori =
  | "ekonomi"
  | "crm"
  | "mejl"
  | "komm"
  | "projekt"
  | "dokument"
  | "lagring"
  | "mf"
  | "ehandel"
  | "analys"
  | "support"
  | "bokning"
  | "hr"
  | "affarssystem"
  | "avtal"
  | "automation"
  | "it"
  | "ai"
  | "ovrigt";

// Ordningen styr kategorichipsen i fritextfrågan: vanligast först.
const kategoriNamn: Record<Kategori, string> = {
  ekonomi: "Ekonomi",
  crm: "CRM & sälj",
  mejl: "Mejl & kalender",
  komm: "Kommunikation",
  projekt: "Projekt",
  dokument: "Dokument & anteckningar",
  lagring: "Fillagring",
  mf: "Marknadsföring",
  ehandel: "E-handel & webb",
  analys: "Analys & kalkyl",
  support: "Kundtjänst",
  bokning: "Bokning & tidbok",
  hr: "HR & lön",
  affarssystem: "Affärssystem & lager",
  avtal: "Avtal & signering",
  automation: "Automation",
  it: "IT & säkerhet",
  ai: "AI-verktyg",
  ovrigt: "Övrigt",
};

// Regelgrupper: finare indelning än kategorin när systemen inom en kategori
// inte beter sig likadant (Klarna bokför inte, Hotjar mäter beteende och inte
// trafik). Matchningen i kopplingsreglerna sker på regelgrupp när den finns.
type RegelToken =
  | Kategori
  | "betalning"
  | "kassa"
  | "webbanalys"
  | "beteende"
  | "webbplats"
  | "design"
  | "video"
  | "bildai"
  | "lon"
  | "schema"
  | "tidrapport"
  | "erp"
  | "lager"
  | "enkat"
  | "seo"
  | "socialt"
  | "losenord"
  | "mdm";

// Katalog över vanliga system i svenska småbolag. Namnen används i leads
// och på kartan; håll stavningen som varumärkena själva skriver den.
// regelgrupp: ersätter kategorin vid regelmatchning när systemet inte beter
// sig som kategorins typfall.
// overlapp: två valda system i samma overlapp-grupp gör samma jobb → bytestips.
// ingarI: verktyget ingår i ett paket som också finns i katalogen (Word i
// Microsoft 365). Nämns i bytestipset när både paketet och verktyget är valda.
// Bara en bråkdel visas som snabbval; resten hittas genom att söka.
// sok: extra sökord för system som folk kallar något annat än varumärket
// säger i dag (Office, G Suite, Azure AD). Visas aldrig, används bara i
// sökningen så att besökaren hittar rätt utan att kunna det nya namnet.
type KatalogPost = {
  namn: string;
  kat: Kategori;
  regelgrupp?: RegelToken;
  overlapp?: string;
  ingarI?: string;
  sok?: string[];
};

const M365 = "Microsoft 365";
const GWS = "Google Workspace";

const systemKatalog: KatalogPost[] = [
  // Ekonomi: bokföring
  { namn: "Fortnox", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Visma eEkonomi", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Bokio", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Wint", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "PE Accounting", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Björn Lundén", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Briox", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Dooer", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "SpeedLedger", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Billogram", kat: "ekonomi" },
  // Ekonomi: betalning och kassa
  { namn: "Klarna", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Stripe", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Zettle", kat: "ekonomi", regelgrupp: "betalning", sok: ["izettle"] },
  { namn: "Swish", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "PayPal", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Qliro", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Walley", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Nets", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Payson", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Swedbank Pay", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Square", kat: "ekonomi", regelgrupp: "kassa", overlapp: "kassasystem" },
  { namn: "Sitoo", kat: "ekonomi", regelgrupp: "kassa", overlapp: "kassasystem" },
  { namn: "Caspeco", kat: "ekonomi", regelgrupp: "kassa", overlapp: "kassasystem" },
  { namn: "Trivec", kat: "ekonomi", regelgrupp: "kassa", overlapp: "kassasystem" },
  { namn: "Onslip", kat: "ekonomi", regelgrupp: "kassa", overlapp: "kassasystem" },
  // CRM och sälj
  { namn: "HubSpot", kat: "crm", overlapp: "crm" },
  { namn: "Pipedrive", kat: "crm", overlapp: "crm" },
  { namn: "Salesforce", kat: "crm", overlapp: "crm" },
  { namn: "Upsales", kat: "crm", overlapp: "crm" },
  { namn: "Lime CRM", kat: "crm", overlapp: "crm" },
  { namn: "Zoho CRM", kat: "crm", overlapp: "crm" },
  { namn: "webCRM", kat: "crm", overlapp: "crm" },
  { namn: "SuperOffice", kat: "crm", overlapp: "crm" },
  { namn: "Dynamics 365", kat: "crm", overlapp: "crm", sok: ["microsoft dynamics"] },
  // Mejl och kalender
  { namn: M365, kat: "mejl", overlapp: "kontorspaket", sok: ["office", "office 365", "o365", "m365", "microsoft office"] },
  { namn: GWS, kat: "mejl", overlapp: "kontorspaket", sok: ["g suite", "gsuite", "google apps"] },
  { namn: "Outlook", kat: "mejl", overlapp: "mejlklient", ingarI: M365 },
  { namn: "Gmail", kat: "mejl", overlapp: "mejlklient", ingarI: GWS },
  { namn: "Exchange", kat: "mejl", ingarI: M365 },
  { namn: "Google Calendar", kat: "mejl", ingarI: GWS },
  // Kommunikation
  { namn: "Slack", kat: "komm", overlapp: "chatt" },
  { namn: "Teams", kat: "komm", overlapp: "chatt", ingarI: M365, sok: ["microsoft teams"] },
  { namn: "Google Chat", kat: "komm", overlapp: "chatt", ingarI: GWS },
  { namn: "Discord", kat: "komm", overlapp: "chatt" },
  { namn: "Zoom", kat: "komm", regelgrupp: "video", overlapp: "video" },
  { namn: "Google Meet", kat: "komm", regelgrupp: "video", overlapp: "video", ingarI: GWS },
  { namn: "Whereby", kat: "komm", regelgrupp: "video", overlapp: "video" },
  { namn: "Webex", kat: "komm", regelgrupp: "video", overlapp: "video" },
  { namn: "Viva Engage", kat: "komm", ingarI: M365, sok: ["yammer"] },
  { namn: "WhatsApp Business", kat: "komm" },
  { namn: "Loom", kat: "komm" },
  // Projekt och uppgifter
  { namn: "Monday", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Trello", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Asana", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "ClickUp", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Jira", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Basecamp", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Smartsheet", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Wrike", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Linear", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Podio", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Microsoft Planner", kat: "projekt", overlapp: "projektverktyg", ingarI: M365 },
  { namn: "Microsoft To Do", kat: "projekt", overlapp: "uppgiftslista", ingarI: M365 },
  { namn: "Google Tasks", kat: "projekt", overlapp: "uppgiftslista", ingarI: GWS },
  { namn: "Notion", kat: "projekt" },
  { namn: "Airtable", kat: "projekt" },
  { namn: "Harvest", kat: "projekt", regelgrupp: "tidrapport", overlapp: "tidrapportering" },
  { namn: "Toggl", kat: "projekt", regelgrupp: "tidrapport", overlapp: "tidrapportering" },
  { namn: "Clockify", kat: "projekt", regelgrupp: "tidrapport", overlapp: "tidrapportering" },
  { namn: "Millnet", kat: "projekt", regelgrupp: "tidrapport", overlapp: "tidrapportering" },
  // Dokument och anteckningar
  { namn: "Word", kat: "dokument", overlapp: "ordbehandlare", ingarI: M365 },
  { namn: "Google Docs", kat: "dokument", overlapp: "ordbehandlare", ingarI: GWS },
  { namn: "PowerPoint", kat: "dokument", overlapp: "presentation", ingarI: M365 },
  { namn: "Google Slides", kat: "dokument", overlapp: "presentation", ingarI: GWS },
  { namn: "OneNote", kat: "dokument", overlapp: "anteckningar", ingarI: M365 },
  { namn: "Google Keep", kat: "dokument", overlapp: "anteckningar", ingarI: GWS },
  { namn: "Evernote", kat: "dokument", overlapp: "anteckningar" },
  { namn: "Confluence", kat: "dokument", overlapp: "kunskapsbank" },
  { namn: "Microsoft Loop", kat: "dokument", overlapp: "kunskapsbank", ingarI: M365 },
  { namn: "Miro", kat: "dokument", overlapp: "whiteboard" },
  { namn: "Microsoft Whiteboard", kat: "dokument", overlapp: "whiteboard", ingarI: M365 },
  { namn: "Visio", kat: "dokument", ingarI: M365 },
  { namn: "Sway", kat: "dokument", ingarI: M365 },
  { namn: "Microsoft Stream", kat: "dokument", ingarI: M365 },
  { namn: "Adobe Acrobat", kat: "dokument" },
  // Fillagring
  { namn: "Google Drive", kat: "lagring", overlapp: "fillagring", ingarI: GWS },
  { namn: "OneDrive", kat: "lagring", overlapp: "fillagring", ingarI: M365 },
  { namn: "Dropbox", kat: "lagring", overlapp: "fillagring" },
  { namn: "Box", kat: "lagring", overlapp: "fillagring" },
  { namn: "iCloud", kat: "lagring", overlapp: "fillagring" },
  { namn: "SharePoint", kat: "lagring", ingarI: M365 },
  // Marknadsföring: utskick
  { namn: "Mailchimp", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "Klaviyo", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "Rule", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "Get a Newsletter", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "ActiveCampaign", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "Brevo", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "Apsis", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "Paloma", kat: "mf", overlapp: "nyhetsbrev" },
  // Marknadsföring: annonsering och sociala kanaler
  { namn: "Meta Ads", kat: "mf", sok: ["facebook ads", "instagram ads", "fb ads"] },
  { namn: "Google Ads", kat: "mf" },
  { namn: "LinkedIn Ads", kat: "mf" },
  { namn: "TikTok Ads", kat: "mf" },
  { namn: "Snapchat Ads", kat: "mf" },
  { namn: "Buffer", kat: "mf", regelgrupp: "socialt", overlapp: "socialaverktyg" },
  { namn: "Hootsuite", kat: "mf", regelgrupp: "socialt", overlapp: "socialaverktyg" },
  { namn: "Later", kat: "mf", regelgrupp: "socialt", overlapp: "socialaverktyg" },
  { namn: "Sprout Social", kat: "mf", regelgrupp: "socialt", overlapp: "socialaverktyg" },
  { namn: "Meta Business Suite", kat: "mf", regelgrupp: "socialt", sok: ["facebook business"] },
  { namn: "Trustpilot", kat: "mf" },
  // Marknadsföring: design och produktion
  { namn: "Canva", kat: "mf", regelgrupp: "design", overlapp: "designverktyg" },
  { namn: "Figma", kat: "mf", regelgrupp: "design", overlapp: "designverktyg" },
  { namn: "Adobe Creative Cloud", kat: "mf", regelgrupp: "design", overlapp: "designverktyg", sok: ["adobe cc"] },
  { namn: "Photoshop", kat: "mf", regelgrupp: "design" },
  { namn: "Illustrator", kat: "mf", regelgrupp: "design" },
  { namn: "InDesign", kat: "mf", regelgrupp: "design" },
  { namn: "Clipchamp", kat: "mf", regelgrupp: "design", ingarI: M365 },
  { namn: "Publisher", kat: "mf", regelgrupp: "design", ingarI: M365 },
  // Marknadsföring: enkäter och formulär
  { namn: "Typeform", kat: "mf", regelgrupp: "enkat", overlapp: "enkatverktyg" },
  { namn: "SurveyMonkey", kat: "mf", regelgrupp: "enkat", overlapp: "enkatverktyg" },
  { namn: "Google Forms", kat: "mf", regelgrupp: "enkat", overlapp: "enkatverktyg", ingarI: GWS },
  { namn: "Microsoft Forms", kat: "mf", regelgrupp: "enkat", overlapp: "enkatverktyg", ingarI: M365 },
  // E-handel och webb
  { namn: "Shopify", kat: "ehandel", overlapp: "webbshop" },
  { namn: "WooCommerce", kat: "ehandel", overlapp: "webbshop" },
  { namn: "Quickbutik", kat: "ehandel", overlapp: "webbshop" },
  { namn: "Magento", kat: "ehandel", overlapp: "webbshop" },
  { namn: "PrestaShop", kat: "ehandel", overlapp: "webbshop" },
  { namn: "Starweb", kat: "ehandel", overlapp: "webbshop" },
  { namn: "Jetshop", kat: "ehandel", overlapp: "webbshop" },
  { namn: "Askås", kat: "ehandel", overlapp: "webbshop" },
  { namn: "Centra", kat: "ehandel", overlapp: "webbshop" },
  { namn: "Wix", kat: "ehandel", regelgrupp: "webbplats", overlapp: "sajtbyggare" },
  { namn: "Squarespace", kat: "ehandel", regelgrupp: "webbplats", overlapp: "sajtbyggare" },
  { namn: "WordPress", kat: "ehandel", regelgrupp: "webbplats", overlapp: "sajtbyggare" },
  { namn: "Webflow", kat: "ehandel", regelgrupp: "webbplats", overlapp: "sajtbyggare" },
  { namn: "Google Sites", kat: "ehandel", regelgrupp: "webbplats", overlapp: "sajtbyggare", ingarI: GWS },
  // Analys och kalkyl
  { namn: "Google Analytics", kat: "analys", regelgrupp: "webbanalys", overlapp: "webbanalys", sok: ["ga4", "analytics"] },
  { namn: "Matomo", kat: "analys", regelgrupp: "webbanalys", overlapp: "webbanalys" },
  { namn: "Plausible", kat: "analys", regelgrupp: "webbanalys", overlapp: "webbanalys" },
  { namn: "Google Tag Manager", kat: "analys", regelgrupp: "webbanalys" },
  { namn: "Hotjar", kat: "analys", regelgrupp: "beteende" },
  { namn: "Mixpanel", kat: "analys", regelgrupp: "beteende" },
  { namn: "Looker Studio", kat: "analys", overlapp: "bi" },
  { namn: "Power BI", kat: "analys", overlapp: "bi" },
  { namn: "Tableau", kat: "analys", overlapp: "bi" },
  { namn: "Qlik Sense", kat: "analys", overlapp: "bi" },
  { namn: "Excel", kat: "analys", overlapp: "kalkyl", ingarI: M365 },
  { namn: "Google Sheets", kat: "analys", overlapp: "kalkyl", ingarI: GWS },
  { namn: "Microsoft Access", kat: "analys", ingarI: M365 },
  { namn: "Semrush", kat: "analys", regelgrupp: "seo", overlapp: "seoverktyg" },
  { namn: "Ahrefs", kat: "analys", regelgrupp: "seo", overlapp: "seoverktyg" },
  { namn: "Google Search Console", kat: "analys", regelgrupp: "seo" },
  // Kundtjänst
  { namn: "Zendesk", kat: "support", overlapp: "supportverktyg" },
  { namn: "Freshdesk", kat: "support", overlapp: "supportverktyg" },
  { namn: "Intercom", kat: "support", overlapp: "supportverktyg" },
  { namn: "Kundo", kat: "support", overlapp: "supportverktyg" },
  { namn: "Front", kat: "support", overlapp: "supportverktyg" },
  { namn: "Crisp", kat: "support", overlapp: "supportverktyg" },
  { namn: "Tawk.to", kat: "support", overlapp: "supportverktyg" },
  { namn: "HubSpot Service Hub", kat: "support", overlapp: "supportverktyg" },
  // Bokning och tidbok
  { namn: "Calendly", kat: "bokning", overlapp: "motesbokning" },
  { namn: "Microsoft Bookings", kat: "bokning", overlapp: "motesbokning", ingarI: M365 },
  { namn: "Bokadirekt", kat: "bokning", overlapp: "bokningssystem" },
  { namn: "Timma", kat: "bokning", overlapp: "bokningssystem" },
  { namn: "Boka.se", kat: "bokning", overlapp: "bokningssystem" },
  // HR och lön
  { namn: "Hailey HR", kat: "hr", overlapp: "hrsystem" },
  { namn: "Sympa", kat: "hr", overlapp: "hrsystem" },
  { namn: "Flex HRM", kat: "hr", overlapp: "hrsystem" },
  { namn: "Personalkollen", kat: "hr", overlapp: "hrsystem" },
  { namn: "Winningtemp", kat: "hr" },
  { namn: "Teamtailor", kat: "hr", overlapp: "rekrytering" },
  { namn: "Varbi", kat: "hr", overlapp: "rekrytering" },
  { namn: "Visma Lön", kat: "hr", regelgrupp: "lon", overlapp: "lonesystem" },
  { namn: "Fortnox Lön", kat: "hr", regelgrupp: "lon", overlapp: "lonesystem" },
  { namn: "Hogia Lön", kat: "hr", regelgrupp: "lon", overlapp: "lonesystem" },
  { namn: "Kontek Lön", kat: "hr", regelgrupp: "lon", overlapp: "lonesystem" },
  { namn: "Crona Lön", kat: "hr", regelgrupp: "lon", overlapp: "lonesystem" },
  { namn: "Planday", kat: "hr", regelgrupp: "schema", overlapp: "schemalaggning" },
  { namn: "Quinyx", kat: "hr", regelgrupp: "schema", overlapp: "schemalaggning" },
  // Affärssystem och lager
  { namn: "Monitor ERP", kat: "affarssystem", regelgrupp: "erp", overlapp: "erpsystem" },
  { namn: "Jeeves", kat: "affarssystem", regelgrupp: "erp", overlapp: "erpsystem" },
  { namn: "Pyramid", kat: "affarssystem", regelgrupp: "erp", overlapp: "erpsystem" },
  { namn: "Garp", kat: "affarssystem", regelgrupp: "erp", overlapp: "erpsystem" },
  { namn: "Specter", kat: "affarssystem", regelgrupp: "erp", overlapp: "erpsystem" },
  { namn: "SAP Business One", kat: "affarssystem", regelgrupp: "erp", overlapp: "erpsystem" },
  { namn: "Business Central", kat: "affarssystem", regelgrupp: "erp", overlapp: "erpsystem", sok: ["navision", "dynamics business central"] },
  { namn: "Visma Administration", kat: "affarssystem", regelgrupp: "erp", overlapp: "erpsystem" },
  { namn: "Ongoing WMS", kat: "affarssystem", regelgrupp: "lager" },
  { namn: "nShift", kat: "affarssystem", regelgrupp: "lager", overlapp: "frakt", sok: ["unifaun"] },
  { namn: "Fraktjakt", kat: "affarssystem", regelgrupp: "lager", overlapp: "frakt" },
  // Avtal och signering
  { namn: "Scrive", kat: "avtal", overlapp: "signering" },
  { namn: "Oneflow", kat: "avtal", overlapp: "signering" },
  { namn: "DocuSign", kat: "avtal", overlapp: "signering" },
  { namn: "Adobe Acrobat Sign", kat: "avtal", overlapp: "signering" },
  { namn: "Assently", kat: "avtal", overlapp: "signering" },
  { namn: "Verified", kat: "avtal", overlapp: "signering" },
  // Automation och integration
  { namn: "Zapier", kat: "automation", overlapp: "automationsverktyg" },
  { namn: "Make", kat: "automation", overlapp: "automationsverktyg" },
  { namn: "Power Automate", kat: "automation", overlapp: "automationsverktyg", ingarI: M365 },
  { namn: "n8n", kat: "automation", overlapp: "automationsverktyg" },
  { namn: "Workato", kat: "automation", overlapp: "automationsverktyg" },
  // IT och säkerhet
  { namn: "1Password", kat: "it", regelgrupp: "losenord", overlapp: "losenordshanterare" },
  { namn: "Bitwarden", kat: "it", regelgrupp: "losenord", overlapp: "losenordshanterare" },
  { namn: "LastPass", kat: "it", regelgrupp: "losenord", overlapp: "losenordshanterare" },
  { namn: "Keeper", kat: "it", regelgrupp: "losenord", overlapp: "losenordshanterare" },
  { namn: "Microsoft Intune", kat: "it", regelgrupp: "mdm", overlapp: "enhetshantering", ingarI: M365 },
  { namn: "Jamf", kat: "it", regelgrupp: "mdm", overlapp: "enhetshantering" },
  { namn: "Entra ID", kat: "it", ingarI: M365, sok: ["azure ad", "active directory", "aad"] },
  { namn: "Microsoft Defender", kat: "it", ingarI: M365 },
  { namn: "Bitdefender", kat: "it" },
  // AI-verktyg
  { namn: "ChatGPT", kat: "ai", overlapp: "ai-assistent" },
  { namn: "Claude", kat: "ai", overlapp: "ai-assistent" },
  { namn: "Copilot", kat: "ai", overlapp: "ai-assistent", sok: ["microsoft copilot", "m365 copilot"] },
  { namn: "Gemini", kat: "ai", overlapp: "ai-assistent" },
  { namn: "Perplexity", kat: "ai", overlapp: "ai-assistent" },
  { namn: "Jasper", kat: "ai" },
  { namn: "Otter.ai", kat: "ai" },
  { namn: "ElevenLabs", kat: "ai" },
  { namn: "Midjourney", kat: "ai", regelgrupp: "bildai" },
  { namn: "DALL-E", kat: "ai", regelgrupp: "bildai" },
  { namn: "Adobe Firefly", kat: "ai", regelgrupp: "bildai" },
  { namn: "Runway", kat: "ai", regelgrupp: "bildai" },
];

// Snabbval under sökfältet: de vanligaste hos målgruppen. Resten av katalogen
// nås genom sökfältet, annars blir listan en vägg av logotyper.
const snabbval = [
  "Fortnox",
  M365,
  "HubSpot",
  "Slack",
  GWS,
  "Shopify",
  "Mailchimp",
  "ChatGPT",
  "Trello",
  "Google Analytics",
];

// Regelkatalogen: vad två sorters system kan göra ihop. Matchas på
// regel-token (kategori eller regelgrupp), riktningsneutral text som
// prefixas med systemens riktiga namn. Skriv bara regler som stämmer för
// ALLA system bakom respektive token; specialfall får egen regelgrupp.
const kopplingsregler: { par: [RegelToken, RegelToken]; text: string }[] = [
  // Ekonomi
  { par: ["ekonomi", "crm"], text: "godkänd offert blir faktura automatiskt" },
  { par: ["ekonomi", "analys"], text: "nyckeltalen uppdaterar sig själva i rapporterna" },
  { par: ["ekonomi", "lagring"], text: "kvitton och underlag arkiveras automatiskt" },
  { par: ["ekonomi", "projekt"], text: "projektets timmar och utlägg blir fakturaunderlag" },
  { par: ["ekonomi", "komm"], text: "betald faktura ger en notis i kanalen" },
  { par: ["ekonomi", "ehandel"], text: "ordrar bokförs utan handpåläggning" },
  { par: ["ekonomi", "dokument"], text: "underlagen följer med fakturan utan letande" },
  { par: ["ekonomi", "hr"], text: "personalkostnaderna syns i samma siffror som resten" },
  { par: ["ekonomi", "avtal"], text: "signerat avtal blir faktura direkt" },
  { par: ["ekonomi", "bokning"], text: "bokningen blir kvitto eller faktura automatiskt" },
  // CRM
  { par: ["crm", "mejl"], text: "mejl och möten loggas på rätt kund" },
  { par: ["crm", "mf"], text: "kundlistan styr utskick och annonsmålgrupper" },
  { par: ["crm", "projekt"], text: "vunnen affär blir ett projekt med uppgifter direkt" },
  { par: ["crm", "analys"], text: "säljtratten blir mätbar" },
  { par: ["crm", "lagring"], text: "avtal och offerter sparas på rätt kund" },
  { par: ["crm", "komm"], text: "kunddialogen samlas på ett ställe" },
  { par: ["crm", "ehandel"], text: "kunderna i butiken blir kontakter i registret" },
  { par: ["crm", "dokument"], text: "offertmallarna fylls med rätt kunduppgifter" },
  { par: ["crm", "support"], text: "ärenden och kundhistorik hamnar i samma vy" },
  { par: ["crm", "bokning"], text: "varje bokning blir en kontakt med historik" },
  { par: ["crm", "avtal"], text: "signerat avtal uppdaterar affären automatiskt" },
  // Marknadsföring
  { par: ["mf", "analys"], text: "kampanjresultaten mäts mot riktiga siffror" },
  { par: ["mf", "ehandel"], text: "köpdatan styr kampanjer och annonser" },
  { par: ["mf", "dokument"], text: "budskapen återanvänds i stället för att skrivas om" },
  // Mejl och kalender
  { par: ["mejl", "komm"], text: "mötesbokningar och påminnelser dyker upp i chatten" },
  { par: ["mejl", "projekt"], text: "deadlines hamnar i kalendern av sig själva" },
  { par: ["mejl", "lagring"], text: "bilagor arkiveras automatiskt i rätt mapp" },
  { par: ["mejl", "dokument"], text: "utkast och bilagor följer med i mejlflödet" },
  { par: ["mejl", "hr"], text: "onboarding och medarbetarsamtal bokas in automatiskt" },
  { par: ["mejl", "bokning"], text: "bokningar och påminnelser hamnar i kalendern" },
  { par: ["mejl", "it"], text: "konton och behörigheter styrs från ett ställe" },
  // Projekt
  { par: ["projekt", "lagring"], text: "filerna ligger på rätt projekt" },
  { par: ["projekt", "komm"], text: "uppdateringar landar där teamet redan är" },
  { par: ["projekt", "dokument"], text: "underlagen ligger på rätt uppgift" },
  { par: ["projekt", "hr"], text: "bemanningen planeras mot vad teamet faktiskt hinner" },
  // E-handel
  { par: ["ehandel", "analys"], text: "försäljningen syns i realtid i rapporterna" },
  { par: ["ehandel", "komm"], text: "nya ordrar pingar direkt i kanalen" },
  { par: ["ehandel", "support"], text: "kundtjänst ser ordern utan att fråga efter ordernummer" },
  { par: ["ehandel", "lager"], text: "lagersaldot i butiken stämmer med hyllan" },
  // Analys, kommunikation och lagring
  { par: ["analys", "komm"], text: "veckans siffror postas automatiskt i kanalen" },
  { par: ["analys", "dokument"], text: "siffrorna hamnar färdiga i rapporten" },
  { par: ["komm", "lagring"], text: "filer som delas i chatten sparas på rätt ställe" },
  { par: ["komm", "support"], text: "nya ärenden pingar teamet direkt" },
  { par: ["dokument", "lagring"], text: "dokumenten hamnar i rätt mapp automatiskt" },
  { par: ["dokument", "komm"], text: "dokument delas och kommenteras där teamet redan är" },
  { par: ["dokument", "avtal"], text: "mallen blir avtal och signeras utan omvägar" },
  // Betalning och kassa
  { par: ["betalning", "ekonomi"], text: "betalningarna prickas av i bokföringen automatiskt" },
  { par: ["betalning", "ehandel"], text: "kassan och betalningen hänger ihop utan mellansteg" },
  { par: ["betalning", "crm"], text: "ni ser vad varje kund faktiskt har betalat" },
  { par: ["kassa", "ekonomi"], text: "dagskassan bokförs automatiskt" },
  { par: ["kassa", "lager"], text: "lagret minskar vid varje köp i butiken" },
  { par: ["kassa", "crm"], text: "köpen i butiken hamnar på rätt kund" },
  { par: ["kassa", "analys"], text: "butiksförsäljningen syns i samma rapport som resten" },
  { par: ["kassa", "bokning"], text: "bokning och betalning blir ett enda flöde" },
  // Webbanalys och beteende
  { par: ["webbanalys", "mf"], text: "ni ser vilka kampanjer som ger trafik som konverterar" },
  { par: ["webbanalys", "ehandel"], text: "besök och köp kopplas ihop i samma vy" },
  { par: ["webbanalys", "webbplats"], text: "ni ser vad besökarna faktiskt gör på sajten" },
  { par: ["webbanalys", "analys"], text: "webbsiffrorna landar i samma rapport som resten" },
  { par: ["beteende", "ehandel"], text: "ni ser var besökarna fastnar innan köpet" },
  { par: ["beteende", "webbplats"], text: "ni ser var besökarna fastnar på sidorna" },
  { par: ["beteende", "mf"], text: "kampanjtrafiken följs hela vägen in på sidan" },
  { par: ["beteende", "webbanalys"], text: "siffrorna får en förklaring i hur besökarna beter sig" },
  // Webbplats
  { par: ["webbplats", "crm"], text: "formulären på sajten skapar kontakter automatiskt" },
  { par: ["webbplats", "mf"], text: "kampanjerna leder till sidor som går att följa upp" },
  { par: ["webbplats", "support"], text: "chatten på sajten blir ärenden i stället för tappade frågor" },
  { par: ["webbplats", "bokning"], text: "besökaren bokar direkt på sajten" },
  // Design och bild-AI
  { par: ["design", "ehandel"], text: "grafiken går rakt in i butik och produktsidor" },
  { par: ["design", "mf"], text: "designmallarna återanvänds i utskick och annonser" },
  { par: ["design", "dokument"], text: "grafiken återanvänds i dokument och presentationer" },
  { par: ["design", "socialt"], text: "grafiken går direkt ut i flödet" },
  { par: ["bildai", "mf"], text: "AI:n tar fram bilder och grafik till inlägg och annonser" },
  { par: ["bildai", "ehandel"], text: "AI:n skapar produktbilder åt butiken" },
  { par: ["bildai", "design"], text: "AI-bilderna landar direkt i designflödet" },
  // Video
  { par: ["video", "mejl"], text: "möteslänken hamnar rätt i varje kalenderbokning" },
  { par: ["video", "crm"], text: "kundmöten loggas på rätt kontakt" },
  { par: ["video", "komm"], text: "mötet startar där samtalet redan pågår" },
  { par: ["video", "bokning"], text: "varje bokat möte får sin länk automatiskt" },
  // HR, lön, schema och tid
  { par: ["hr", "lagring"], text: "anställningsavtal och intyg arkiveras rätt" },
  { par: ["hr", "komm"], text: "nyanställda får rätt kanaler från dag ett" },
  { par: ["hr", "avtal"], text: "anställningsavtal signeras och sparas i ett flöde" },
  { par: ["hr", "it"], text: "nyanställda får konton och utrustning utan handpåläggning" },
  { par: ["lon", "ekonomi"], text: "lönerna bokförs utan handpåläggning" },
  { par: ["lon", "hr"], text: "anställningar och löneunderlag bygger på samma uppgifter" },
  { par: ["lon", "tidrapport"], text: "arbetad tid blir lön utan omtagning" },
  { par: ["lon", "schema"], text: "passen blir löneunderlag direkt" },
  { par: ["schema", "tidrapport"], text: "schemat och rapporterad tid jämförs automatiskt" },
  { par: ["schema", "komm"], text: "schemaändringar syns direkt där personalen är" },
  { par: ["schema", "hr"], text: "bemanningen bygger på rätt personaluppgifter" },
  { par: ["tidrapport", "ekonomi"], text: "timmarna blir fakturaunderlag utan efterarbete" },
  { par: ["tidrapport", "projekt"], text: "tiden landar på rätt projekt" },
  { par: ["tidrapport", "analys"], text: "ni ser vad varje uppdrag faktiskt kostar i tid" },
  // Kundtjänst
  { par: ["support", "mejl"], text: "kundmejlen blir ärenden i stället för lösa trådar" },
  { par: ["support", "analys"], text: "ni ser vad kunderna hör av sig om" },
  { par: ["support", "lagring"], text: "svar och underlag hämtas ur samma mapp" },
  { par: ["support", "bokning"], text: "ombokningar sköts utan telefonkö" },
  // Avtal
  { par: ["avtal", "lagring"], text: "signerade avtal arkiveras på rätt ställe" },
  { par: ["avtal", "projekt"], text: "signeringen startar projektet direkt" },
  // Affärssystem och lager
  { par: ["erp", "ekonomi"], text: "ordrar, inköp och bokföring bygger på samma siffror" },
  { par: ["erp", "ehandel"], text: "butiken och affärssystemet delar artiklar och priser" },
  { par: ["erp", "lager"], text: "lagersaldot uppdateras när ordern registreras" },
  { par: ["erp", "crm"], text: "säljarna ser lager och leveranser direkt" },
  { par: ["erp", "analys"], text: "nyckeltalen bygger på affärssystemets data" },
  { par: ["erp", "projekt"], text: "order och produktion planeras i samma flöde" },
  { par: ["lager", "ekonomi"], text: "leveranser och fraktkostnader bokförs rätt" },
  { par: ["lager", "support"], text: "kundtjänst ser var paketet är" },
  // Enkäter
  { par: ["enkat", "crm"], text: "svaren landar på rätt kund" },
  { par: ["enkat", "analys"], text: "kundsvaren blir mätbara över tid" },
  { par: ["enkat", "mejl"], text: "utskick och svar hänger ihop" },
  { par: ["enkat", "support"], text: "missnöjda svar blir ärenden direkt" },
  { par: ["enkat", "hr"], text: "medarbetarsvaren samlas utan kalkylbladsrundor" },
  // Sökoptimering och sociala kanaler
  { par: ["seo", "webbplats"], text: "ni ser vilka sidor som drar in trafik" },
  { par: ["seo", "ehandel"], text: "produktsidorna optimeras mot det folk söker på" },
  { par: ["seo", "mf"], text: "annonser och organisk trafik planeras ihop" },
  { par: ["seo", "analys"], text: "söktrafiken landar i samma rapport som resten" },
  { par: ["socialt", "analys"], text: "räckvidd och klick mäts mot riktiga siffror" },
  { par: ["socialt", "ehandel"], text: "inläggen leder rakt till produkten" },
  { par: ["socialt", "mf"], text: "annonser och organiska inlägg planeras i samma kalender" },
  { par: ["socialt", "crm"], text: "de som hör av sig i sociala kanaler blir kontakter" },
  // IT och säkerhet
  { par: ["it", "lagring"], text: "behörigheterna följer med filerna" },
  { par: ["losenord", "it"], text: "inloggningarna samlas och delas säkert" },
  { par: ["losenord", "komm"], text: "lösenord slutar skickas i chatten" },
  { par: ["losenord", "hr"], text: "inloggningar delas ut och stängs av i takt med anställningar" },
  { par: ["mdm", "it"], text: "datorer och telefoner hanteras från samma ställe" },
  { par: ["mdm", "hr"], text: "utrustningen följer anställningen" },
  // Automation: limmet mellan systemen
  { par: ["automation", "ekonomi"], text: "underlagen skickas vidare utan handpåläggning" },
  { par: ["automation", "crm"], text: "nya leads hamnar rätt utan att någon klistrar in dem" },
  { par: ["automation", "mejl"], text: "mejl och kalender triggar nästa steg automatiskt" },
  { par: ["automation", "projekt"], text: "uppgifter skapas när något faktiskt händer" },
  { par: ["automation", "ehandel"], text: "ordern går vidare till rätt system direkt" },
  { par: ["automation", "komm"], text: "teamet får notiser bara när det betyder något" },
  { par: ["automation", "analys"], text: "siffrorna hämtas in utan manuell export" },
  { par: ["automation", "lagring"], text: "filerna sorteras och sparas automatiskt" },
  { par: ["automation", "support"], text: "ärenden sorteras och skickas till rätt person" },
  { par: ["automation", "dokument"], text: "dokumenten skapas ur uppgifter ni redan har" },
  { par: ["automation", "erp"], text: "ordrar och lagerhändelser förs vidare av sig själva" },
  { par: ["automation", "hr"], text: "onboarding och intyg rullar igång av sig själva" },
  { par: ["automation", "mf"], text: "utskicken startar av det kunderna gör" },
  { par: ["automation", "bokning"], text: "bokningen sätter igång allt som ska hända efteråt" },
];

// AI-assistenternas koppling till övriga system: etiketten väljs efter vad
// motparten är för sorts system, så varje koppling säger något konkret.
const aiEtiketter: Record<Kategori, string> = {
  ekonomi: "AI:n tolkar siffrorna och flaggar det som sticker ut",
  crm: "AI:n skriver utkast till offerter och uppföljningsmejl",
  mejl: "AI:n sammanfattar mejltrådar och föreslår svar",
  komm: "AI:n sammanfattar möten och långa trådar",
  projekt: "AI:n bryter ner uppgifter och skriver statusrapporter",
  dokument: "AI:n skriver utkast och sammanfattar långa dokument",
  lagring: "AI:n hittar rätt dokument och sammanfattar innehållet",
  mf: "AI:n tar fram utkast till inlägg och annonstexter",
  ehandel: "AI:n skriver produkttexter och svarar på vanliga kundfrågor",
  analys: "AI:n förklarar vad siffrorna faktiskt betyder",
  support: "AI:n föreslår svar och sorterar ärenden efter allvar",
  bokning: "AI:n svarar på bokningsfrågor och fyller luckorna i kalendern",
  hr: "AI:n skriver annonser, mallar och underlag åt personalarbetet",
  affarssystem: "AI:n hittar mönster i ordrar, inköp och lagernivåer",
  avtal: "AI:n går igenom avtalen och lyfter det som avviker",
  automation: "AI:n föreslår vilka flöden som är värda att automatisera",
  it: "AI:n sammanfattar larmen och förklarar vad de betyder",
  ai: "AI:n avlastar rutinjobbet",
  ovrigt: "AI:n avlastar rutinjobbet i vardagen",
};

// Specialfallen (regelgrupper) beter sig inte som kategorins typfall och
// behöver egna AI-texter: WordPress är en sajt utan butik, betalsystemen
// bokför inte. Övriga faller tillbaka på kategoritexten ovan.
const aiEtiketterGrupp: Partial<Record<RegelToken, string>> = {
  webbplats: "AI:n skriver utkast till texter och innehåll på sajten",
  betalning: "AI:n sammanfattar betalflödena och flaggar det som sticker ut",
  kassa: "AI:n hittar mönster i försäljningen över dagen",
  lon: "AI:n svarar på vanliga lönefrågor och sammanfattar underlagen",
  schema: "AI:n föreslår bemanning utifrån hur trycket brukar se ut",
  tidrapport: "AI:n sammanfattar nedlagd tid och skriver underlaget åt er",
  erp: "AI:n hittar mönster i ordrar, inköp och lagernivåer",
  lager: "AI:n förutser när det är dags att fylla på",
  enkat: "AI:n sammanfattar fritextsvaren till läsbara slutsatser",
  seo: "AI:n tar fram innehållsidéer ur söktrafiken",
  socialt: "AI:n skriver inläggsutkast och förslag på publiceringsplan",
  beteende: "AI:n pekar ut var besökarna tappar intresset",
};

// Verktyg där en AI-koppling inte tillför något: ett lösenordsvalv eller en
// enhetshanterare blir inte bättre av en språkmodell, och en påhittad
// koppling skulle bara göra kartan otrovärdig.
const aiUtanKoppling: RegelToken[] = ["losenord", "mdm"];

// Bytestips när två valda system gör samma jobb. Nyckel = overlapp-grupp,
// "standard" är fallback.
const overlappTexter: Record<string, string> = {
  standard: "{a} och {b} gör i stort sett samma jobb. Ett av dem brukar räcka.",
  kontorspaket:
    "{a} och {b} är två parallella kontorsvärldar. Att samla allt i en brukar spara både pengar och strul.",
  mejlklient:
    "{a} och {b} är två mejlmiljöer sida vid sida. En gemensam brukar ge färre tappade trådar.",
  chatt:
    "{a} och {b} delar på samma konversationer. En kanal brukar ge färre missade meddelanden.",
  fillagring:
    "{a} och {b} betyder att filerna ligger på två ställen. En gemensam yta sparar mycket letande.",
  projektverktyg:
    "{a} och {b} håller reda på samma uppgifter. En tavla räcker för att alla ska veta vad som gäller.",
  ordbehandlare:
    "{a} och {b} gör samma jobb med dokumenten. Väljer ni en slipper ni formatstrul mellan versionerna.",
  anteckningar:
    "{a} och {b} samlar samma anteckningar. Att välja en gör att ni faktiskt hittar tillbaka.",
  nyhetsbrev:
    "{a} och {b} skickar samma sorts utskick. En lista räcker, och den blir lättare att hålla ren.",
  supportverktyg:
    "{a} och {b} tar emot samma ärenden. En inkorg brukar ge färre kunder som faller mellan stolarna.",
  lonesystem:
    "{a} och {b} är två lönesystem. Ett av dem räcker, det andra kostar ändå varje månad.",
  erpsystem:
    "{a} och {b} är två affärssystem. Att köra dem parallellt brukar sluta i dubbel inmatning.",
  automationsverktyg:
    "{a} och {b} bygger samma sorts flöden. Samlar ni dem i ett verktyg blir de lättare att underhålla.",
  signering:
    "{a} och {b} signerar samma avtal. En tjänst räcker, och då hamnar avtalen på ett ställe.",
  losenordshanterare:
    "{a} och {b} förvarar samma inloggningar. Ett valv gör behörigheterna lättare att hålla ordning på.",
  tidrapportering:
    "{a} och {b} mäter samma timmar. Ett av dem räcker som facit.",
  "ai-assistent":
    "{a} och {b} löser samma sak. Välj en som standard så samlas vanan och historiken på ett ställe.",
};

const MAX_SYSTEM = 12;

type ValtSystem = { namn: string; kat: Kategori };

const katalogPost = (namn: string) =>
  systemKatalog.find((s) => s.namn.toLowerCase() === namn.toLowerCase());

// Regel-token: regelgruppen om systemet har en, annars kategorin.
// Fritextsystem finns inte i katalogen och faller tillbaka på sin kategori.
const regelToken = (v: ValtSystem): RegelToken => katalogPost(v.namn)?.regelgrupp ?? v.kat;

type Tips = { typ: "byte" | "komplement"; text: string };

// Tipsmotorn: bytesförslag (två system i samma overlapp-grupp) och
// komplementförslag (lucka i floran som ett känt verktyg skulle fylla).
// Föreslår aldrig något ur en kategori/grupp besökaren redan täckt.
function beraknaTips(valda: ValtSystem[]): Tips[] {
  const tips: Tips[] = [];

  // Ingår verktyget i ett paket som också är valt? Då är det värt att veta
  // vid ett bytesval: den ena sidan är redan betald.
  const ingarIText = (v: ValtSystem) => {
    const paket = katalogPost(v.namn)?.ingarI;
    return paket && valda.some((x) => x.namn === paket)
      ? ` ${v.namn} ingår dessutom i er ${paket}.`
      : "";
  };

  for (let i = 0; i < valda.length; i++) {
    for (let j = i + 1; j < valda.length; j++) {
      const ga = katalogPost(valda[i].namn)?.overlapp;
      const gb = katalogPost(valda[j].namn)?.overlapp;
      if (ga && ga === gb) {
        const mall = overlappTexter[ga] ?? overlappTexter.standard;
        tips.push({
          typ: "byte",
          text:
            mall.replace("{a}", valda[i].namn).replace("{b}", valda[j].namn) +
            ingarIText(valda[i]) +
            ingarIText(valda[j]),
        });
      }
    }
  }

  const kats = new Set(valda.map((v) => v.kat));
  const toks = new Set(valda.map(regelToken));
  const grupper = new Set(valda.map((v) => katalogPost(v.namn)?.overlapp).filter(Boolean));
  const namnMedToken = (t: RegelToken) => valda.find((v) => regelToken(v) === t)?.namn;
  const namnMedGrupp = (g: string) =>
    valda.find((v) => katalogPost(v.namn)?.overlapp === g)?.namn;

  if (kats.has("crm") && !toks.has("ekonomi")) {
    tips.push({
      typ: "komplement",
      text: `Ett ekonomisystem som Fortnox skulle kunna ta emot affärerna från ${namnMedToken("crm")} och göra offert till faktura i ett steg.`,
    });
  }
  if (toks.has("ekonomi") && !kats.has("crm")) {
    tips.push({
      typ: "komplement",
      text: `Ett CRM, till exempel Pipedrive eller HubSpot, skulle ge koll på affärerna innan de landar i ${namnMedToken("ekonomi")}.`,
    });
  }
  if (toks.has("lon") && !toks.has("tidrapport") && !toks.has("schema")) {
    tips.push({
      typ: "komplement",
      text: `Ett tidrapporteringsverktyg skulle göra arbetad tid till löneunderlag i ${namnMedToken("lon")} utan omtagning.`,
    });
  }
  if (toks.has("erp") && !toks.has("analys") && !grupper.has("bi")) {
    tips.push({
      typ: "komplement",
      text: `Ett rapportverktyg som Power BI eller Looker Studio skulle göra datan i ${namnMedToken("erp")} läsbar utan exportrundor.`,
    });
  }
  if (toks.has("ehandel") && !grupper.has("nyhetsbrev")) {
    tips.push({
      typ: "komplement",
      text: `Ett nyhetsbrevsverktyg som Mailchimp eller Klaviyo skulle kunna jobba direkt med köpdatan från ${namnMedToken("ehandel")}.`,
    });
  }
  let webbmatning = false;
  if ((toks.has("ehandel") || toks.has("webbplats")) && !toks.has("webbanalys")) {
    webbmatning = true;
    tips.push({
      typ: "komplement",
      text: `Google Analytics eller Matomo skulle visa vad besökarna gör på ${namnMedToken("ehandel") ?? namnMedToken("webbplats")} innan de köper eller hör av sig.`,
    });
  }
  if (kats.has("mf") && !kats.has("analys") && !webbmatning) {
    tips.push({
      typ: "komplement",
      text: "Ett mätverktyg, till exempel Google Analytics, skulle visa vilka kampanjer som faktiskt ger något.",
    });
  }
  if (kats.has("projekt") && !kats.has("lagring")) {
    tips.push({
      typ: "komplement",
      text: `En gemensam fillagring som Google Drive eller OneDrive skulle ge ${namnMedToken("projekt")} ett ställe att hämta filerna från.`,
    });
  }
  if (grupper.has("chatt") && !kats.has("projekt")) {
    tips.push({
      typ: "komplement",
      text: `Ett projektverktyg som Trello eller Monday skulle ge trådarna i ${namnMedGrupp("chatt")} någonstans att bli uppgifter.`,
    });
  }
  if (kats.has("support") && !kats.has("crm")) {
    tips.push({
      typ: "komplement",
      text: `Ett CRM skulle ge ${namnMedToken("support")} kundhistoriken som i dag saknas när någon hör av sig.`,
    });
  }
  if (valda.length >= 4 && !kats.has("automation") && !kats.has("ai")) {
    tips.push({
      typ: "komplement",
      text: "Ett integrationsverktyg som Zapier eller Make skulle kunna koppla ihop flera av systemen utan utvecklare.",
    });
  }
  if (valda.length >= 3 && !kats.has("ai")) {
    tips.push({
      typ: "komplement",
      text: "Ett AI-verktyg som ChatGPT eller Copilot skulle kunna avlasta rutinjobbet i flera av systemen.",
    });
  }

  return tips.slice(0, 4);
}

// Kaosplatser för upp till 12 noder (index-styrt, deterministiskt).
const kaosPlatser = [
  { x: 34, y: 26, r: -9 },
  { x: 62, y: 22, r: 7 },
  { x: 46, y: 48, r: -6 },
  { x: 70, y: 54, r: 11 },
  { x: 28, y: 60, r: 8 },
  { x: 55, y: 34, r: -12 },
  { x: 38, y: 74, r: 6 },
  { x: 66, y: 76, r: -8 },
  { x: 22, y: 42, r: -5 },
  { x: 50, y: 64, r: 9 },
  { x: 78, y: 36, r: -7 },
  { x: 42, y: 14, r: 10 },
];

export function SystemKollen() {
  const [valda, setValda] = useState<ValtSystem[]>([]);
  const [sok, setSok] = useState("");
  const [okand, setOkand] = useState<string | null>(null);
  const [fas, setFas] = useState<"bygga" | "formular" | "ordnad">("bygga");
  const [lead, setLead] = useState({ namn: "", epost: "", foretag: "" });
  const [skickar, setSkickar] = useState(false);
  const [fel, setFel] = useState(false);
  const [etikett, setEtikett] = useState<number | null>(null);
  const mobil = useIsMobile();

  const n = valda.length;
  const ordnad = fas === "ordnad";
  const hub = { x: 50, y: mobil ? 48 : 47 };
  const rx = mobil ? 34 : 38;
  const ry = mobil ? 36 : 33;

  const orderedPos = (i: number) => {
    const vinkel = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(n, 1);
    return { x: hub.x + rx * Math.cos(vinkel), y: hub.y + ry * Math.sin(vinkel) };
  };
  const kaosPos = (i: number) => kaosPlatser[i % kaosPlatser.length];
  const pos = (i: number) => (ordnad ? orderedPos(i) : kaosPos(i));

  // Sökförslag: katalogträffar som inte redan är valda, max 6.
  // Katalogen är lång, så träffar som BÖRJAR på söktexten går före träffar
  // mitt inne i namnet: "word" ska ge Word före WordPress. Sorteringen är
  // stabil i övrigt, så katalogordningen avgör inom varje grupp.
  const sokLag = sok.trim().toLowerCase();
  const traffPoang = (k: KatalogPost) =>
    k.namn.toLowerCase().startsWith(sokLag) ? 2 : k.sok?.some((a) => a.startsWith(sokLag)) ? 1 : 0;
  const forslag =
    sokLag.length < 2
      ? []
      : systemKatalog
          .filter(
            (k) =>
              (k.namn.toLowerCase().includes(sokLag) ||
                k.sok?.some((a) => a.includes(sokLag))) &&
              !valda.some((v) => v.namn.toLowerCase() === k.namn.toLowerCase()),
          )
          .sort((a, b) => traffPoang(b) - traffPoang(a))
          .slice(0, 6);
  // Exakt träff i katalogen ELLER bland redan valda: då göms fritextvalet
  // (annars visas en död "Lägg till"-knapp för system som redan ligger inne).
  const exaktTraff =
    forslag.some((f) => f.namn.toLowerCase() === sok.trim().toLowerCase()) ||
    valda.some((v) => v.namn.toLowerCase() === sok.trim().toLowerCase());

  const laggTill = (namn: string, kat: Kategori) => {
    if (n >= MAX_SYSTEM) return;
    if (valda.some((v) => v.namn.toLowerCase() === namn.toLowerCase())) {
      // Dubblett: lägg inte till, men städa sök/kategorifrågan så att
      // gränssnittet aldrig fastnar i ett läge där knapparna inget gör.
      setSok("");
      setOkand(null);
      return;
    }
    if (n === 0) skickaHandelse("systemkollen_start");
    setValda((s) => [...s, { namn, kat }]);
    setSok("");
    setOkand(null);
  };
  const taBort = (namn: string) => setValda((s) => s.filter((v) => v.namn !== namn));
  const reset = () => {
    setValda([]);
    setSok("");
    setOkand(null);
    setFas("bygga");
    setLead({ namn: "", epost: "", foretag: "" });
    setFel(false);
    setEtikett(null);
  };

  // Kopplingar: regelkatalogen matchas på regel-token (i<j, en linje per
  // systempar). AI-assistenter kopplas till allt som ett lättare lager med
  // etikett vald efter motpartens kategori; bild-AI (Midjourney) går i
  // stället via egna regler så den bara kopplas dit den hör hemma.
  const lankar: { a: number; b: number; text: string; ai: boolean }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const A = valda[i];
      const B = valda[j];
      const tokA = regelToken(A);
      const tokB = regelToken(B);
      if (tokA === tokB) continue;
      // Ingår det ena i det andra (Word i Microsoft 365) är det inte två
      // system som pratar, utan ett. Överlappstipset nämner släktskapet
      // i stället, så kartan inte skryter med kopplingar som är gratis.
      if (katalogPost(A.namn)?.ingarI === B.namn || katalogPost(B.namn)?.ingarI === A.namn) continue;
      const prefix = `${A.namn} + ${B.namn}: `;
      if (tokA === "ai" || tokB === "ai") {
        const partner = tokA === "ai" ? B : A;
        const partnerTok = tokA === "ai" ? tokB : tokA;
        if (partner.kat === "ai") continue;
        if (aiUtanKoppling.includes(partnerTok)) continue;
        lankar.push({
          a: i,
          b: j,
          text: prefix + (aiEtiketterGrupp[partnerTok] ?? aiEtiketter[partner.kat]),
          ai: true,
        });
        continue;
      }
      const regel = kopplingsregler.find(
        (r) =>
          (r.par[0] === tokA && r.par[1] === tokB) ||
          (r.par[0] === tokB && r.par[1] === tokA),
      );
      if (regel) lankar.push({ a: i, b: j, text: prefix + regel.text, ai: false });
    }
  }
  const k = lankar.length;
  const tips = beraknaTips(valda);

  // När besökaren går vidare till bokningen från resultatet följer kartan
  // med: /boka läser nyckeln vid mount och förifyller meddelandefältet.
  const sparaBokningsKontext = () => {
    skickaHandelse("systemkollen_boka");
    try {
      sessionStorage.setItem(
        "systemkollen-boka",
        `Jag gjorde systemkollen: ${valda.map((v) => `${v.namn} (${kategoriNamn[v.kat]})`).join(", ")}. ` +
          (k > 0
            ? `Kartan visade ${k} ${k === 1 ? "möjlig koppling" : "möjliga kopplingar"}.`
            : "Kartan visade inga givna kopplingar."),
      );
    } catch {
      /* privat läge utan sessionStorage: bokningen funkar ändå */
    }
  };

  // Trassel i kaosläget (kedja + genvägar mellan kaosplatserna).
  const tangle: [number, number][] = [];
  for (let i = 0; i < n - 1; i++) tangle.push([i, i + 1]);
  if (n >= 3) tangle.push([n - 1, 0]);
  if (n >= 5) for (let i = 0; i < n; i += 2) tangle.push([i, (i + 3) % n]);

  const arcPath = (ai: number, bi: number) => {
    const A = orderedPos(ai);
    const B = orderedPos(bi);
    const mx = (A.x + B.x) / 2;
    const my = (A.y + B.y) / 2;
    let dx = mx - hub.x;
    let dy = my - hub.y;
    let len = Math.hypot(dx, dy);
    if (len < 1) {
      dx = -(B.y - A.y);
      dy = B.x - A.x;
      len = Math.hypot(dx, dy) || 1;
    }
    const bulge = 13;
    const cx = mx + (dx / len) * bulge;
    const cy = my + (dy / len) * bulge;
    return {
      d: `M ${A.x} ${A.y} Q ${cx} ${cy} ${B.x} ${B.y}`,
      // Punkt på kvadratiska Bezierkurvan vid parameter t (0..1)
      punkt: (t: number) => ({
        x: (1 - t) * (1 - t) * A.x + 2 * (1 - t) * t * cx + t * t * B.x,
        y: (1 - t) * (1 - t) * A.y + 2 * (1 - t) * t * cy + t * t * B.y,
      }),
    };
  };

  // Markörens plats på bågen: börja på mitten och glid utåt längs kurvan
  // tills punkten inte krockar med någon systemruta eller navet. Rutorna har
  // fast pixelstorlek, så deras andel av procentrymden växer när kartan är
  // smal; marginalerna är tilltagna för att täcka även mindre fönster.
  // Hittas ingen fri punkt får mitten duga; markören ritas då under rutan
  // (ingen z-index, noderna ligger på 1) i stället för ovanpå texten.
  const marginalX = mobil ? 14 : 11;
  const marginalY = mobil ? 9.5 : 8;
  const markorPos = (ai: number, bi: number) => {
    const arc = arcPath(ai, bi);
    const rutor = [...valda.map((_, idx) => orderedPos(idx)), hub];
    for (const t of [0.5, 0.42, 0.58, 0.34, 0.66, 0.26, 0.74]) {
      const p = arc.punkt(t);
      if (!rutor.some((q) => Math.abs(p.x - q.x) < marginalX && Math.abs(p.y - q.y) < marginalY))
        return { ...p, dold: false };
    }
    // Hela kurvan är upptagen: göm markören (linjen ritas ändå). En osynlig
    // knapp bakom en ruta vore bara en fokusfälla för tangentbordet.
    return { ...arc.punkt(0.5), dold: true };
  };

  // Grinden: leaden skickas till Netlify Forms (statiska detekteringsfilen,
  // ALDRIG "/"), med hela systemlistan som säljunderlag. I dev-läge saknas
  // Netlify-mottagaren, då släpps man vidare ändå.
  const skickaLead = async (e: React.FormEvent) => {
    e.preventDefault();
    // Grinden kräver minst två system, men taggarna går att ta bort medan
    // formuläret är öppet: validera igen här så tomma leads aldrig skickas.
    if (n < 2) {
      setFas("bygga");
      return;
    }
    setSkickar(true);
    setFel(false);
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "systemkollen",
          "bot-field": "",
          namn: lead.namn,
          epost: lead.epost,
          foretag: lead.foretag,
          system: valda.map((v) => `${v.namn} (${kategoriNamn[v.kat]})`).join(", "),
          kopplingar: String(k),
          tips: tips.map((t) => `[${t.typ}] ${t.text}`).join(" | "),
        }).toString(),
      });
      if (!res.ok && import.meta.env.PROD) throw new Error(String(res.status));
      skickaHandelse("systemkollen_lead", { antal_system: n, antal_kopplingar: k });
      setFas("ordnad");
    } catch {
      setFel(true);
    } finally {
      setSkickar(false);
    }
  };

  return (
    <section id="systemkollen" className="snap-start relative min-h-svh bg-paper text-ink overflow-hidden">
      <div className="ai-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow mb-5">Huvudtjänst · Digitala system & AI</div>
            <h2 className="display-heading text-3xl md:text-5xl text-ink">
              Gör <span className="text-brand-green">systemkollen</span>.
            </h2>
            <p className="mt-6 text-ink/75 leading-relaxed max-w-2xl">
              Skriv in systemen ni faktiskt använder och se er egen karta växa
              fram. Sedan ordnar jag den: kartan som landar är mitt förslag på
              hur allt kan jobba ihop.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {/* Sökfält + snabbval (döljs när kartan är ordnad) */}
          {!ordnad && (
            <div className="mt-10 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={sok}
                  onChange={(e) => {
                    setSok(e.target.value);
                    setOkand(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (forslag.length > 0) laggTill(forslag[0].namn, forslag[0].kat);
                      // Samma spärr som fritextknappen: är söktexten ett redan
                      // valt system ska ingen kategorifråga öppnas (knapparna
                      // i den vore döda eftersom laggTill stoppar dubbletter).
                      else if (sok.trim().length >= 2 && !exaktTraff) setOkand(sok.trim());
                    }
                  }}
                  placeholder={n >= MAX_SYSTEM ? "Max 12 system" : "Sök era system: Fortnox, HubSpot, Slack ..."}
                  disabled={n >= MAX_SYSTEM}
                  aria-label="Sök efter system"
                  className="w-full bg-white border border-line px-4 py-3.5 text-base text-ink placeholder:text-subtle focus:outline-none focus:border-brand-green disabled:opacity-50"
                />
                {(forslag.length > 0 || (sok.trim().length >= 2 && !exaktTraff)) && (
                  <div className="absolute inset-x-0 top-full mt-1 z-20 bg-white border border-line shadow-xl">
                    {forslag.map((f) => (
                      <button
                        key={f.namn}
                        type="button"
                        onClick={() => laggTill(f.namn, f.kat)}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-left text-ink/85 hover:bg-mist"
                      >
                        <span>{f.namn}</span>
                        <span className="tracked text-[9px] text-subtle">{kategoriNamn[f.kat]}</span>
                      </button>
                    ))}
                    {sok.trim().length >= 2 && !exaktTraff && (
                      <button
                        type="button"
                        onClick={() => setOkand(sok.trim())}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left text-brand-green hover:bg-mist border-t border-line"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Lägg till &quot;{sok.trim()}&quot;
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Kategorifråga för okända system */}
              {okand && (
                <div className="mt-3 border border-brand-green/40 bg-white p-4">
                  <p className="text-sm text-ink/75 mb-3">
                    Vad är <span className="font-semibold text-ink">{okand}</span> för sorts system?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(kategoriNamn) as Kategori[]).map((kat) => (
                      <button
                        key={kat}
                        type="button"
                        onClick={() => laggTill(okand, kat)}
                        className="px-3 py-1.5 text-xs font-semibold border border-line text-ink/75 hover:border-brand-green hover:text-ink transition-colors"
                      >
                        {kategoriNamn[kat]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Snabbval */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="tracked text-[9px] text-subtle mr-1">Vanliga:</span>
                {snabbval
                  .filter((namn) => !valda.some((v) => v.namn === namn))
                  .slice(0, mobil ? 6 : 10)
                  .map((namn) => {
                    const post = systemKatalog.find((s) => s.namn === namn)!;
                    return (
                      <button
                        key={namn}
                        type="button"
                        onClick={() => laggTill(post.namn, post.kat)}
                        disabled={n >= MAX_SYSTEM}
                        className="px-3 py-1.5 text-xs font-semibold border border-line text-ink/70 hover:border-brand-green/60 hover:text-ink transition-colors disabled:opacity-40"
                      >
                        {namn}
                      </button>
                    );
                  })}
              </div>

              {/* Valda system som borttagbara taggar */}
              {n > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {valda.map((v) => (
                    <span
                      key={v.namn}
                      className="inline-flex items-center gap-1.5 bg-brand-green/10 border border-brand-green/40 text-ink px-2.5 py-1 text-xs font-semibold"
                    >
                      {v.namn}
                      <button
                        type="button"
                        onClick={() => taBort(v.namn)}
                        aria-label={`Ta bort ${v.namn}`}
                        className="text-ink/65 hover:text-ink"
                      >
                        <X className="h-3 w-3" strokeWidth={2.5} />
                      </button>
                    </span>
                  ))}
                  <span className="text-xs text-subtle">{n}/{MAX_SYSTEM}</span>
                </div>
              )}
            </div>
          )}

          {/* Kartan */}
          <div
            className={`sysmap relative mt-8 h-[21rem] md:h-96 border border-line bg-mist ${
              ordnad ? "is-visible" : ""
            }`}
            onClick={() => setEtikett(null)}
          >
            {n === 0 ? (
              <p className="absolute inset-0 flex items-center justify-center px-8 text-center text-sm text-subtle">
                Sök eller välj era system ovan, så byggs er karta här.
              </p>
            ) : (
              <>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  {tangle.map(([a, b]) => (
                    <line
                      key={`t-${a}-${b}`}
                      className="jungle-tangle"
                      x1={kaosPos(a).x}
                      y1={kaosPos(a).y}
                      x2={kaosPos(b).x}
                      y2={kaosPos(b).y}
                      stroke="#8A8D90"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  {valda.map((v, i) => (
                    <line
                      key={`o-${v.namn}`}
                      className="sysmap-link"
                      pathLength={1}
                      x1={hub.x}
                      y1={hub.y}
                      x2={orderedPos(i).x}
                      y2={orderedPos(i).y}
                      stroke="#1F8A5C"
                      strokeOpacity="0.35"
                      strokeWidth="1.25"
                      vectorEffect="non-scaling-stroke"
                      style={{ transitionDelay: `${0.55 + i * 0.06}s` }}
                    />
                  ))}
                  {lankar.map((l, j) => (
                    <path
                      key={`s-${l.a}-${l.b}`}
                      className="sysmap-link"
                      pathLength={1}
                      d={arcPath(l.a, l.b).d}
                      stroke="#1F8A5C"
                      strokeOpacity={l.ai ? "0.3" : etikett === j ? "1" : "0.8"}
                      strokeWidth={l.ai ? "0.75" : etikett === j ? "1.75" : "1"}
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      style={{ transitionDelay: `${1.3 + j * 0.09}s` }}
                    />
                  ))}
                </svg>
                <span className="sysmap-hub-ring" style={{ left: `${hub.x}%`, top: `${hub.y}%` }} />
                {/* Kopplingsmarkörer: hover/tryck visar förslaget i klartext */}
                {ordnad &&
                  lankar.map((l, j) => {
                    const p = markorPos(l.a, l.b);
                    if (p.dold) return null;
                    return (
                      <button
                        key={`m-${l.a}-${l.b}`}
                        type="button"
                        aria-label={l.text}
                        onMouseEnter={() => setEtikett(j)}
                        onMouseLeave={() => setEtikett((v) => (v === j ? null : v))}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEtikett((v) => (v === j ? null : j));
                        }}
                        className="jungle-late absolute flex h-6 w-6 items-center justify-center"
                        style={{
                          left: `${p.x}%`,
                          top: `${p.y}%`,
                          transform: "translate(-50%, -50%)",
                          transitionDelay: `${1.6 + j * 0.05}s`,
                        }}
                      >
                        <span
                          className={`block rounded-full transition-all ${
                            etikett === j ? "h-3 w-3 bg-brand-green shadow-[0_0_10px_rgba(31,138,92,0.8)]" : "h-2 w-2 bg-brand-green/70"
                          }`}
                        />
                      </button>
                    );
                  })}
                {/* Etiketten */}
                {ordnad && etikett !== null && lankar[etikett] && (
                  <div
                    className="absolute z-20 max-w-[260px] -translate-x-1/2 bg-white text-ink text-xs font-semibold leading-snug px-3 py-2 shadow-lg border border-line pointer-events-none"
                    style={{
                      left: `${Math.min(80, Math.max(20, markorPos(lankar[etikett].a, lankar[etikett].b).x))}%`,
                      top: `${Math.max(4, markorPos(lankar[etikett].a, lankar[etikett].b).y - 10)}%`,
                    }}
                  >
                    {lankar[etikett].text}
                  </div>
                )}
                {/* Navet */}
                <div
                  className="jungle-late absolute"
                  style={{ left: `${hub.x}%`, top: `${hub.y}%`, transform: "translate(-50%, -50%)", transitionDelay: "0.45s", zIndex: 2 }}
                >
                  <div className="sysmap-node-box bg-brand-green text-paper shadow-md whitespace-nowrap px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold">
                    Er affär
                  </div>
                </div>
                {/* Systemnoderna med riktiga namn */}
                {valda.map((v, i) => {
                  const p = pos(i);
                  const rot = ordnad ? 0 : kaosPos(i).r;
                  return (
                    <div
                      key={v.namn}
                      className="sysmap-node absolute"
                      style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `translate(-50%, -50%) rotate(${rot}deg)`, zIndex: 1 }}
                    >
                      <div className="jungle-pop sysmap-node-box whitespace-nowrap bg-white border border-line text-ink/80 shadow-sm px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold">
                        {v.namn}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Under kartan: knapp / grind / resultat beroende på fas */}
          <div className="mt-8 min-h-14">
            {fas === "bygga" && (
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    skickaHandelse("systemkollen_grind", { antal_system: n });
                    setFas("formular");
                  }}
                  disabled={n < 2}
                  className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-ink disabled:opacity-40 disabled:pointer-events-none"
                >
                  Skapa ordning <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
                <span className="text-sm text-subtle">
                  {n < 2 ? "Välj minst två system." : `${n} system valda.`}
                </span>
              </div>
            )}

            {fas === "formular" && (
              <form onSubmit={skickaLead} className="max-w-xl border border-brand-green/40 bg-white p-5 md:p-6">
                <p className="text-sm text-ink/75 leading-relaxed mb-5">
                  Fyll i så ordnar jag er karta. Jag hör av mig med tankar om
                  er systemflora, kostnadsfritt och utan förpliktelser.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={lead.namn}
                    onChange={(e) => setLead({ ...lead, namn: e.target.value })}
                    placeholder="Namn *"
                    aria-label="Namn"
                    className="w-full bg-paper border border-line px-4 py-3 text-base text-ink placeholder:text-subtle focus:outline-none focus:border-brand-green"
                  />
                  <input
                    type="email"
                    required
                    value={lead.epost}
                    onChange={(e) => setLead({ ...lead, epost: e.target.value })}
                    placeholder="E-post *"
                    aria-label="E-post"
                    className="w-full bg-paper border border-line px-4 py-3 text-base text-ink placeholder:text-subtle focus:outline-none focus:border-brand-green"
                  />
                  <input
                    type="text"
                    value={lead.foretag}
                    onChange={(e) => setLead({ ...lead, foretag: e.target.value })}
                    placeholder="Företag (valfritt)"
                    aria-label="Företag"
                    className="w-full bg-paper border border-line px-4 py-3 text-base text-ink placeholder:text-subtle focus:outline-none focus:border-brand-green sm:col-span-2"
                  />
                </div>
                {fel && (
                  <p className="mt-3 text-sm text-ink/75">
                    Något gick fel vid skickandet. Prova igen om en stund.
                  </p>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={skickar}
                    className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-ink disabled:opacity-50"
                  >
                    {skickar ? "Ordnar ..." : "Ordna min karta"}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFas("bygga")}
                    className="text-sm text-subtle hover:text-ink underline underline-offset-4"
                  >
                    Tillbaka
                  </button>
                </div>
              </form>
            )}

            {fas === "ordnad" && (
              <div className="jungle-result is-visible">
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="jungle-late md:col-span-7" style={{ transitionDelay: "0.9s" }}>
                    <p className="display-heading text-xl md:text-2xl text-ink">
                      {k > 0 ? (
                        <>
                          {n} system. <span className="text-brand-green">Ett förslag: {k} {k === 1 ? "koppling" : "kopplingar"}.</span>
                        </>
                      ) : (
                        <>
                          {n} system, <span className="text-brand-green">inga givna kopplingar.</span>
                        </>
                      )}
                    </p>
                    <p className="mt-2 text-sm text-ink/70 leading-relaxed">
                      {k > 0
                        ? `${mobil ? "Tryck" : "Håll muspekaren"} på punkterna längs linjerna så ser ni vad varje koppling gör. Jag hör av mig med mina tankar.`
                        : "Era system saknar självklara kopplingar i min regelbok, vilket i sig säger något. Jag hör av mig med mina tankar."}
                    </p>
                  </div>
                  <div className="jungle-late md:col-span-5 flex flex-wrap items-center gap-4 md:justify-end" style={{ transitionDelay: "1.05s" }}>
                    <Link
                      to="/boka"
                      onClick={sparaBokningsKontext}
                      className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-3.5 text-sm font-semibold hover:bg-ink hover:text-ink transition-colors"
                    >
                      Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    </Link>
                    <button
                      type="button"
                      onClick={reset}
                      className="text-sm text-subtle hover:text-ink underline underline-offset-4"
                    >
                      Börja om
                    </button>
                  </div>
                </div>
                {/* Bara första tipset visas i klartext: resten är samtalets
                    värde och följer med i leadet så Alexander kommer förberedd.
                    De låsta raderna visar äkta etiketter men PLATSHÅLLARTEXT
                    bakom blurret: riktiga tips i DOM:en hade gått att läsa
                    genom att plocka bort filtret i utvecklarverktygen. */}
                {tips.length > 0 && (
                  <div
                    className="jungle-late mt-8 max-w-3xl border border-line bg-white p-5 md:p-6"
                    style={{ transitionDelay: "1.2s" }}
                  >
                    <p className="tracked text-[10px] text-subtle mb-4">Tips utifrån er karta</p>
                    <div className="space-y-3.5">
                      <div className="flex items-start gap-3 text-sm text-ink/75 leading-relaxed">
                        <span
                          className={`tracked shrink-0 mt-0.5 px-2 py-0.5 border text-[9px] ${
                            tips[0].typ === "byte"
                              ? "border-line text-ink/65"
                              : "border-brand-green/50 text-brand-green"
                          }`}
                        >
                          {tips[0].typ === "byte" ? "Överlapp" : "Komplement"}
                        </span>
                        <span>{tips[0].text}</span>
                      </div>
                      {tips.slice(1).map((t, i) => (
                        <div
                          key={`last-${i}`}
                          aria-hidden="true"
                          className="flex items-start gap-3 text-sm text-ink/75 leading-relaxed select-none pointer-events-none"
                        >
                          <span
                            className={`tracked shrink-0 mt-0.5 px-2 py-0.5 border text-[9px] ${
                              t.typ === "byte"
                                ? "border-line text-ink/65"
                                : "border-brand-green/50 text-brand-green"
                            }`}
                          >
                            {t.typ === "byte" ? "Överlapp" : "Komplement"}
                          </span>
                          <span className="blur-[5px] opacity-60">
                            {i % 2 === 0
                              ? "Det här tipset går jag igenom i samtalet, tillsammans med resten av er karta."
                              : "Även det här förslaget sparar jag till samtalet, det bygger på era system."}
                          </span>
                        </div>
                      ))}
                    </div>
                    {tips.length > 1 && (
                      <p className="mt-4 pt-4 border-t border-line text-sm text-ink/75 leading-relaxed">
                        Jag ser{" "}
                        <span className="font-semibold text-ink">
                          {tips.length - 1 === 1 ? "en sak till" : `${tips.length - 1} saker till`}
                        </span>{" "}
                        i er karta. Dem går vi igenom i ett{" "}
                        <Link
                          to="/boka"
                          onClick={sparaBokningsKontext}
                          className="font-semibold text-ink border-b border-brand-green hover:text-brand-green"
                        >
                          kostnadsfritt samtal
                        </Link>
                        .
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
