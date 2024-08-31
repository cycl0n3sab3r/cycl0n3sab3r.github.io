// import React from 'react';
// import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import VaccinationDashboard from './VaccinationDashboard';
import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const calculateReadabilityScore = (avgSentenceLength, jargonPercentage) => {
  return 100 - (avgSentenceLength * 0.5 + jargonPercentage * 2);
};

// const policyData = [
//   {
//   title: "NZ backs moves to improve global access to COVID vaccines",
//   content: "New Zealand welcomes and strongly supports the announcement made by the United States Trade Representative to work for a waiver of IP protections on COVID-19 vaccines at the WTO, Trade Minister Damien O'Connor said...",
//   date: new Date('2021-05-06').getTime(),
//   readabilityScore: calculateReadabilityScore(26.21, 4),
//   avgSentenceLength: 26.21,
//   jargonPercentage: 4,
//   jargon: ["WTO", "TRIPS waiver", "COVAX Facility", "APEC"]
//   },
//   {
//   title: "Prime Minister meets with key ASEAN and East Asia Summit partners",
//   content: "Prime Minister Jacinda Ardern today attended the ASEAN-New Zealand Commemorative Summit and discussed with Leaders a range of shared challenges facing the Indo-Pacific region, including...",
//   date: new Date('2020-11-14').getTime(),
//   readabilityScore: calculateReadabilityScore(28.29, 8),
//   avgSentenceLength: 28.29,
//   jargonPercentage: 8,
//   jargon: ["Commemorative", "ASEAN", "Indo-Pacific", "Economic recovery", "Partners", "Diplomatic", "Strategic hub", "Exporters", "Joint statement", "Partnership", "Sustainability", "Trade facilitation", "Digital commerce", "Multilateral"]
//   },
//   {
//   title: "Govt books resilient amid challenging global times",
//   content: "The resilient economy and the Government's responsible financial management means New Zealand is well positioned to respond to a difficult and challenging global environment...",
//   date: new Date('2022-11-08').getTime(),
//   readabilityScore: calculateReadabilityScore(20.28, 1.86),
//   avgSentenceLength: 20.28,
//   jargonPercentage: 1.86,
//   jargon: ["OBEGAL", "GST", "Fuel Excise Duties", "Road Users Charges", "GDP", "ACC derivatives", "OECD"]
//   },
//   {
//   title: "Two new vaccines secured, enough for every New Zealander",
//   content: "The Government will purchase COVID-19 vaccines from pharmaceutical companies AstraZeneca and Novavax, meaning every New Zealander will be able to be vaccinated, Prime Minister Jacinda Ardern announced today...",
//   date: new Date('2020-12-17').getTime(),
//   readabilityScore: calculateReadabilityScore(21.69, 2.82),
//   avgSentenceLength: 21.69,
//   jargonPercentage: 2.82,
//   jargon: ["vaccine courses", "pre-ordered", "streamlined", "Medsafe", "immunisation", "Pfizer/BioNTech", "Janssen", "AstraZeneca", "Novavax", "pharmaceuticals regulator", "clinical trials", "COVAX Facility"]
//   },
//   {
//   title: "NZ ready to provide $75m for Pacific and global COVID-19 vaccination support",
//   content: "New Zealand is preparing to support our Pacific partners to access safe and effective COVID-19 vaccines at the earliest opportunity, Foreign Affairs Minister Hon Nanaia Mahuta and Associate Foreign Affairs Minister Aupito William Sio say...",
//   date: new Date('2020-12-17').getTime(),
//   readabilityScore: calculateReadabilityScore(23.76, 0.75),
//   avgSentenceLength: 23.76,
//   jargonPercentage: 0.75,
//   jargon: ["COVAX Facility Advance Market Commitment", "Official Development Assistance"]
//   },
//   {
//   title: "Extending support for the COVID-19 elimination strategy to June 2022",
//   content: "The Government has set aside extra funding to support the health system's COVID-19 response and to maintain quarantine facilities up to June 2022, Minister for COVID-19 Response Chris Hipkins said today...",
//   date: new Date('2020-12-18').getTime(),
//   readabilityScore: calculateReadabilityScore(24.52, 10),
//   avgSentenceLength: 24.52,
//   jargonPercentage: 10,
//   jargon: ["COVID-19", "contingency fund", "contact tracing", "PPE", "DHBs", "MIQ", "Directorate", "Information Technology", "infection prevention and control audits", "Department of Prime Minister and Cabinet", "Border Executive Board"]
//   },
//   {
//   title: "Govt's careful economic management recognised",
//   content: "The Government's prudent fiscal management and strong policy programme in the face of the COVID-19 global pandemic have been acknowledged by the credit rating agency Fitch...",
//   date: new Date('2021-01-13').getTime(),
//   readabilityScore: calculateReadabilityScore(24.69, 4.33),
//   avgSentenceLength: 24.69,
//   jargonPercentage: 4.33,
//   jargon: ["fiscal", "pandemic", "affirmed", "outlook", "macro-policy", "resurgence", "V-shaped", "GDP", "Wage Subsidy Scheme", "infrastructure", "strains", "net debt"]
//   },
//   {
//   title: "COVID-19 vaccine slated for possible approval next week",
//   content: "The green light for New Zealand's first COVID-19 vaccine could be granted in just over a week, Prime Minister Jacinda Ardern said today...",
//   date: new Date('2021-01-26').getTime(),
//   readabilityScore: calculateReadabilityScore(18.77, 1.40),
//   avgSentenceLength: 18.77,
//   jargonPercentage: 1.40,
//   jargon: ["Medsafe", "Medicines Assessment Advisory Committee (MAAC)", "benefit-risk assessment", "border defences", "provisional approval", "gazette", "rolling submissions", "Immunisation Programme", "DHBs", "surge workforce webpage", "regulatory authorities", "provisional vaccinators", "Immunisation Advisory Centre"]
//   },
//   {
//   title: "Environment investments support New Zealand's high value exports",
//   content: "$17.7 million for new greenhouse gas testing and research facility$4.3 million invested in soil and grass research, including a faster hybrid breeding system for ryegrass to increase pasture resilienceBoosting on-the-ground help and advice for farmers and growers throughCareer Pathways SchemeLocking in New Zealand's record $53 billion export revenue, and aspiring for more...",
//   date: new Date('2023-06-14').getTime(),
//   readabilityScore: calculateReadabilityScore(24.44, 19),
//   avgSentenceLength: 24.44,
//   jargonPercentage: 19,
//   jargon: ["greenhouse gas", "hybrid breeding system", "Career Pathways Scheme", "export revenue", "emissions reduction plan", "respiration chambers", "methane vaccine", "methane-inhibiting capsule", "Sustainable Food and Fibre Futures fund", "nitrate leaching", "carbon sequestration", "Career Pathways Scheme", "Ministry for Primary Industries", "On Farm Support team", "Sustainable Trade Index"]
//   },
//   {
//   title: "Foreign Ministers attend virtual Pacific Islands Forum",
//   content: "Minister of Foreign Affairs Hon Nanaia Mahuta and Hon Aupito William Sio the Associate Minister of Foreign Affairs today attended the virtual Pacific Islands Forum Special Leaders Retreat from Waitangi...",
//   date: new Date('2021-02-03').getTime(),
//   readabilityScore: calculateReadabilityScore(25.69, 2.19),
//   avgSentenceLength: 25.69,
//   jargonPercentage: 2.19,
//   jargon: ["Associate Minister", "Official Development Assistance", "immunisation", "Secretary General", "regional partners", "UNICEF"]
//   },
//   {
//   title: "Ministers sign off on use of first COVID-19 vaccine",
//   content: "Cabinet has confirmed formal Government approval for use of the Pfizer/BioNTech COVID-19 vaccine, COVID-19 Response Minister Chris Hipkins says...",
//   date: new Date('2021-02-10').getTime(),
//   readabilityScore: calculateReadabilityScore(22.40, 2.26),
//   avgSentenceLength: 22.40,
//   jargonPercentage: 2.26,
//   jargon: ["Medsafe", "Advance Purchase Agreement", "COVAX Facility", "MIQ", "Environmental Protection Authority (EPA)", "AstraZeneca", "Janssen", "Novavax", "Polynesian Health Corridors"]
//   },
//   {
//   title: "First batch of COVID-19 vaccine arrives in NZ",
//   content: "The first batch of COVID-19 vaccine arrived in New Zealand this morning, Prime Minister Jacinda Ardern has confirmed...",
//   date: new Date('2021-02-15').getTime(),
//   readabilityScore: calculateReadabilityScore(24.92, 9.62),
//   avgSentenceLength: 24.92,
//   jargonPercentage: 9.62,
//   jargon: ["COVID-19", "vaccine", "Prime Minister", "Pfizer/BioNTech", "immunisation", "quality assurance", "Medsafe", "pharmaceutical", "vaccination", "MIQ", "courses", "workforce", "cleaners", "health checks", "security staff", "customs", "-70 degrees Celsius", "ultra-low temperature", "shipments", "frontline healthcare", "vulnerable", "roll out", "vaccination programme"]
//   },
//   {
//   title: "Big vaccination drive leading to a National Day of Action on October 16",
//   content: "With over half the eligible population now fully vaccinated and more than 80% with at least one dose, we've all got to do our bit reach the remaining 20%, COVID-19 Response Minister Chris Hipkins says...",
//   date: new Date('2021-10-06').getTime(),
//   readabilityScore: calculateReadabilityScore(15.96, 8),
//   avgSentenceLength: 15.96,
//   jargonPercentage: 8,
//   jargon: ["COVID-19", "vaccination", "vaccine", "clinic", "Aotearoa", "Pfizer", "vaccine clinics", "District Health Boards"]
//   },
//   {
//   title: "Second batch of Pfizer/BioNTech doses arrives safely – as the first vaccinations take place in the South Island",
//   content: "A second batch of Pfizer/BioNTech vaccines arrived safely yesterday at Auckland International Airport, COVID-19 Response Minister Chris Hipkins says...",
//   date: new Date('2021-02-24').getTime(),
//   readabilityScore: calculateReadabilityScore(21.33, 5.43),
//   avgSentenceLength: 21.33,
//   jargonPercentage: 5.43,
//   jargon: ["Pfizer/BioNTech", "quality assurance", "checks", "Medsafe", "Ministry of Health", "delivery schedule", "immunisation programme", "rollout", "border workers", "managed isolation and quarantine", "household contacts", "South Island", "vaccinators", "aviation security", "customs workers", "health protection officers", "tier one group", "special-purpose needles", "vial"]
//   },
//   {
//   title: "New partnership agreement signed with Cook Islands",
//   content: "Foreign Minister Nanaia Mahuta and Cook Islands Prime Minister Mark Brown signed a new Statement of Partnership between Aotearoa New Zealand and the Cook Islands in Rarotonga today...",
//   date: new Date('2022-10-14').getTime(),
//   readabilityScore: calculateReadabilityScore(24.75, 5.26),
//   avgSentenceLength: 24.75,
//   jargonPercentage: 5.26,
//   jargon: ["Statement of Partnership", "whakapapa", "Te-Moana-nui-a-Kiwa", "pandemic", "Joint Centenary Declaration"]
//   },
//   {
//   title: "Govt purchases enough Pfizer vaccines for whole country",
//   content: "The Government has guaranteed that every New Zealander will have access to the Pfizer/BioNTech vaccine, after securing an additional 8.5 million doses, Prime Minister Jacinda Ardern announced today...",
//   date: new Date('2021-03-08').getTime(),
//   readabilityScore: calculateReadabilityScore(19.16, 1.88),
//   avgSentenceLength: 19.16,
//   jargonPercentage: 1.88,
//   jargon: ["doses", "Pfizer/BioNTech", "symptomatic", "ultra-cold", "protocols", "portfolio", "Realm countries"]
//   },
//   {
//   title: "Significant support goes to Maori and whānau most at risk of COVID-19",
//   content: "Associate Minister for Health (Māori) Hon Peeni Henare is pleased to confirm that the timing and sequencing of the COVID-19 Vaccine Programme has a strong focus on protecting Māori whānau...",
//   date: new Date('2021-03-10').getTime(),
//   readabilityScore: calculateReadabilityScore(26.57, 29),
//   avgSentenceLength: 26.57,
//   jargonPercentage: 29,
//   jargon: ["Minister", "COVID-19", "Vaccine Programme", "health sector", "vaccination programme", "Māori whānau", "vaccination", "elder", "Pacific peoples", "aged care facility", "kuia", "koroua", "kaumatua", "hapu", "iwi", "whakapapa", "Pasifika", "workforce"]
//   },
//   {
//   title: "Auckland boundary to change 15 December",
//   content: "Auckland boundary settings to change from 15 December, ensuring travel out for all vaccinated people or those with a negative test resultCountry better prepared - 82 percent New Zealanders fully vaccinated, compared to 23 percent three months ago and projections of 90 percent fully vaccinated by mid-December...",
//   date: new Date('2021-11-17').getTime(),
//   readabilityScore: calculateReadabilityScore(25.5, 1.74),
//   avgSentenceLength: 25.5,
//   jargonPercentage: 1.74,
//   jargon: ["vaccinated", "projected", "COVID-19", "boundaries", "enforcement", "Iwi", "regime", "traffic light system", "vaccination rates", "infringement", "check-in", "vaccine certificate", "inter-island"]
//   },
//   {
//   title: "Auckland to move to Alert Level 1 at midday",
//   content: "Auckland will move to COVID-19 Alert Level 1 at midday today, Friday 12 March...",
//   date: new Date('2021-03-12').getTime(),
//   readabilityScore: calculateReadabilityScore(18.76, 3.67),
//   avgSentenceLength: 18.76,
//   jargonPercentage: 3.67,
//   jargon: ["COVID-19", "Alert Level 1", "Level 2", "Level 3", "managed isolation facilities", "day-12 testing", "transmission cycle", "Director-General of Health", "Cabinet", "outbreak", "vaccination programme", "advisory group", "managed isolation and quarantine facilities"]
//   },
//   {
//   title: "Tech ready for businesses and events to open up for summer",
//   content: "Businesses and events will be set for summer, with the free NZ Pass Verifier app to scan and verify My Vaccine Passes now available to download, Minister for COVID-19 Response Chris Hipkins said today...",
//   date: new Date('2021-11-23').getTime(),
//   readabilityScore: calculateReadabilityScore(20.73, 2.1),
//   avgSentenceLength: 20.73,
//   jargonPercentage: 2.1,
//   jargon: ["My Vaccine Pass", "NZ Pass Verifier", "COVID-19 Protection Framework", "Apple", "Google Play", "QR code", "Ministry of Health", "0800 800606"]
//   },
//   {
// title: "COVID-19 milestone: 5000th vaccinator completes specialised training",
// content: "A significant COVID-19 workforce milestone has been reached, with the 5000thvaccinator completing specialised training to administer the Pfizer/BioNtech vaccine, COVID-19 Response Minister Chris Hipkins says...",
// date: new Date('2021-05-18').getTime(),
// readabilityScore: calculateReadabilityScore(26.35, 1.1),
// avgSentenceLength: 26.35,
// jargonPercentage: 1.1,
// jargon: ["Immunisation Advisory Centre (IMAC)", "Medicines Regulations", "Kaiāwhina", "Annual Practising Certificates", "Surge Workforce database"]
// },
// {
// title: "COVID-19 vaccine for urgent overseas travel",
// content: "The Government has confirmed strict criteria for early vaccinations for people who need to travel outside of New Zealand on compassionate grounds or for reasons of national significance, COVID-19 Response Minister Chris Hipkins announced today...",
// date: new Date('2021-03-24').getTime(),
// readabilityScore: calculateReadabilityScore(27.8, 16),
// avgSentenceLength: 27.8,
// jargonPercentage: 16,
// jargon: ["Vaccinations", "Roll-out", "Queue", "Returnees", "Departure", "Yardstick", "Recreational", "Criteria", "Compassionate", "Significant", "Threshold", "Doses", "Recognition", "Fundamental", "Legitimate", "Application", "Process"]
// },
// {
// title: "Covid-19 immigration powers to be extended",
// content: "Temporary COVID-19 immigration powers will be extended to May 2023, providing continued flexibility to support migrants, manage the border, and help industries facing labour shortages, Immigration Minister Kris Faafoi announced today...",
// date: new Date('2021-04-01').getTime(),
// readabilityScore: calculateReadabilityScore(28.46, 4),
// avgSentenceLength: 28.46,
// jargonPercentage: 4,
// jargon: ["Select Committee", "RSE workers", "vaccines roll out", "travel bubble"]
// },
// {
// title: "Independent experts to advise Government on post-vaccination future",
// content: "The Government is acting to ensure decisions on responding to the next phase of the COVID-19 pandemic are informed by the best available scientific evidence and strategic public health advice...",
// date: new Date('2021-04-08').getTime(),
// readabilityScore: calculateReadabilityScore(23.16, 2.35),
// avgSentenceLength: 23.16,
// jargonPercentage: 2.35,
// jargon: ["epidemiology", "infectious diseases", "public health", "modelling", "immunisation", "biostatistical", "infectious diseases expert", "special advisor"]
// },
// {
// title: "Strengthening Trans-Tasman Ties: Australia-New Zealand Foreign Minister Consultations",
// content: "New Zealand Minister of Foreign Affairs, Hon Nanaia Mahuta and Australian Minister for Foreign Affairs and Minister for Women, Senator the Hon Marise Payne, met in Wellington today for biannual Australia-New Zealand Foreign Minister Consultations...",
// date: new Date('2021-04-22').getTime(),
// readabilityScore: calculateReadabilityScore(22.66, 2.31),
// avgSentenceLength: 22.66,
// jargonPercentage: 2.31,
// jargon: ["biannual", "quarantine-free", "liberal international order", "climate resilience", "likeminded", "coalitions", "Single Economic Market", "trans-Tasman"]
// },
// {
// title: "New Zealand to donate 250,000 courses of COVID-19 vaccines to Fiji",
// content: "New Zealand has offered, and Fiji has accepted, sufficient doses of AstraZeneca for 250,000 people from New Zealand's domestic vaccine portfolio, New Zealand Associate Minister of Health and Foreign Affairs Aupito William Sio and Fiji Health and Medical Services Minister Ifereimi Waqainabete announced today...",
// date: new Date('2021-04-29').getTime(),
// readabilityScore: calculateReadabilityScore(24.90, 3.8),
// avgSentenceLength: 24.90,
// jargonPercentage: 3.8,
// jargon: ["AstraZeneca", "portfolio", "Medsafe", "rollout", "COVAX", "AMC", "standards"]
// },
// {
// title: "NZ Cook Islands travel bubble significant step in COVID-19 recovery",
// content: "New Zealand Prime Minister Jacinda Ardern and Cook Islands Prime Minister Mark Brown have today announced that, pending final confirmation by New Zealand's Director-General of Health and the Cook Islands Secretary of Health, two-way quarantine-free travel will commence between the two countries on 17 May (NZT)...",
// date: new Date('2021-05-03').getTime(),
// readabilityScore: calculateReadabilityScore(24.75, 13),
// avgSentenceLength: 24.75,
// jargonPercentage: 13,
// jargon: ["quarantine-free", "Director-General of Health", "COVID-19", "trans-Tasman", "deployment", "roll-out", "protocols", "frameworks", "eligibility", "managed quarantine facilities", "MIQ"]
// },
// {
// title: "NZ backs moves to improve global access to COVID vaccines",
// content: "New Zealand welcomes and strongly supports the announcement made by the United States Trade Representative to work for a waiver of IP protections on COVID-19 vaccines at the WTO, Trade Minister Damien O'Connor said...",
// date: new Date('2021-05-06').getTime(),
// readabilityScore: calculateReadabilityScore(26.21, 4),
// avgSentenceLength: 26.21,
// jargonPercentage: 4,
// jargon: ["WTO", "TRIPS waiver", "COVAX Facility", "APEC"]
// },
// {
// title: "Crown accounts show confidence in Govt economic plan",
// content: "The Government's financial accounts continue to reflect the resilience of the economy and confidence in the Government's economic recovery plan...",
// date: new Date('2021-05-06').getTime(),
// readabilityScore: calculateReadabilityScore(17.68, 3.3),
// avgSentenceLength: 17.68,
// jargonPercentage: 3.3,
// jargon: ["OBEGAL", "HYEFU", "GDP"]
// },
// {
// title: "Thousands of MIQ spaces allocated to secure economic recovery",
// content: "Five hundred spaces per fortnight will be allocated in managed isolation facilities over the next 10 months, many for skilled and critical workers to support our economic recovery, COVID-19 Response Minister Chris Hipkins and Agriculture Minister Damien O'Connor say...",
// date: new Date('2021-05-10').getTime(),
// readabilityScore: calculateReadabilityScore(29.30, 22),
// avgSentenceLength: 29.30,
// jargonPercentage: 22,
// jargon: ["managed isolation", "economic recovery", "Trans-Tasman bubble", "MIQ", "RSE workers", "Construction Sector Accord", "border exceptions", "viticulture", "horticulture", "seasonal variations", "workforce plans", "wage rates", "international obligations", "Managed Isolation Allocation System"]
// },
// {
// title: "Economic resilience provides more options in Budget 2021",
// content: "Securing the recovery and investing in the wellbeing of New Zealanders is the focus of Budget 2021, Grant Robertson told his audience at a pre-budget speech in Auckland this morning...",
// date: new Date('2021-05-10').getTime(),
// readabilityScore: calculateReadabilityScore(23.4, 3.7),
// avgSentenceLength: 23.4,
// jargonPercentage: 3.7,
// jargon: ["Budget", "Vaccine rollout", "Stimulus", "Operating", "Capital allowances", "Fiscal"]
// },
// {
// title: "Further COVID-19 vaccine and economic support for the Pacific",
// content: "New Zealand will be providing protection against COVID-19 to at least 1.2 million people in the Pacific over the coming year$120 million in Official Development Assistance has been reprioritised to support Pacific economies in 2021Foreign Affairs Minister Hon Nanaia Mahuta and Associate Health and Foreign Affairs Minister Aupito William Sio announced today that New Zealand will provide COVID-19 vaccines for rollout in the Cook Islands beginning on 19 May, followed by Niue and Tokelau...",
// date: new Date('2021-05-13').getTime(),
// readabilityScore: calculateReadabilityScore(23.56, 4),
// avgSentenceLength: 23.56,
// jargonPercentage: 4,
// jargon: ["Official Development Assistance", "COVAX Facility", "Medsafe", "Advance Market Commitment"]
// },
// {
// title: "New vaccination requirement for non-citizen travellers to New Zealand",
// content: "Full vaccination will become a requirement for non-New Zealand citizens arriving into the country from 1 November, COVID-19 Response Minister Chris Hipkins says...",
// date: new Date('2021-10-03').getTime(),
// readabilityScore: calculateReadabilityScore(27.26, 5.3),
// avgSentenceLength: 27.26,
// jargonPercentage: 5.3,
// jargon: ["Managed Isolation Allocation System", "COVID-19 Technical Advisory Group", "Air New Zealand aircraft", "Managed Isolation and Quarantine", "COVID-19 Public Health Response (Air Border) Order", "COVID-19 Public Health Response Amendment Act", "QFT arrangement", "Director General of Health"]
// },
// {
// title: "PM Ardern call with President Biden",
// content: "Prime Minister Jacinda Ardern spoke with US President Biden this morning, ahead of the APEC Informal Leaders' Retreat on COVID-19...",
// date: new Date('2021-07-16').getTime(),
// readabilityScore: calculateReadabilityScore(22, 2.94),
// avgSentenceLength: 22,
// jargonPercentage: 2.94,
// jargon: ["APEC", "COVID-19", "vaccine roll-out", "Christchurch Call"]
// },
// {
// title: "Technical amendment to Medicines Act",
// content: "The Government is aware of a High Court decision today about processes to grant provisional consent to some approved medicines, and is making a technical amendment to modernise the law...",
// date: new Date('2021-05-18').getTime(),
// readabilityScore: calculateReadabilityScore(26.90, 4.7),
// avgSentenceLength: 26.90,
// jargonPercentage: 4.7,
// jargon: ["Medicines Act", "Medsafe", "Therapeutic", "Therapeutic Products Act", "Vaccines", "Pandemic", "Bill", "Parliament"]
// },
// {
// title: "Changes to isolation to reflect vaccination status",
// content: "People who are fully vaccinated will now spend less time isolating if they get COVID-19 or are a close contact of a case...",
// date: new Date('2021-11-16').getTime(),
// readabilityScore: calculateReadabilityScore(20.61, 20),
// avgSentenceLength: 20.61,
// jargonPercentage: 20,
// jargon: ["vaccinated", "isolation", "COVID-19", "contact tracing", "confirmed", "cases", "community", "exposed", "partially", "unvaccinated", "symptoms", "genetically", "transmission", "Delta variant", "self-isolate", "dose", "casual plus", "interactions", "infections", "Ministry of Health"]
// },
// {
// title: "Budget boost to tackle on-farm emissions",
// content: "$37 million towards national integrated farm planning system for farmers and growers.$24 million towards agricultural greenhouse gas mitigation research and development.$900,000 to collect vital statistics on agricultural production, such as greenhouse gas emissions...",
// date: new Date('2021-05-20').getTime(),
// readabilityScore: calculateReadabilityScore(19.85, 8.3),
// avgSentenceLength: 19.85,
// jargonPercentage: 8.3,
// jargon: ["integrated farm planning system", "greenhouse gas mitigation", "accelerator fund", "methane and nitrous oxide inhibitors", "biogenic methane emissions", "Agricultural Production Statistics", "roadmap", "high-value consumers"]
// },
// {
// title: "Government invests in the wellbeing of whānau Māori",
// content: "$380 million delivering about 1,000 new homes for Māori including papakāinga housing, repairs to about 700 Māori-owned homes and expanding support services...",
// date: new Date('2021-05-20').getTime(),
// readabilityScore: calculateReadabilityScore(23.72, 2.04),
// avgSentenceLength: 23.72,
// jargonPercentage: 2.04,
// jargon: ["papakāinga", "kōhanga reo", "Te Puni Kōkiri", "He Poutama Rangatahi", "Mana in Mahi", "Māori Cadetships", "COVID-19", "Māori Health Authority", "Hauora Māori", "iwi", "marae", "hapū", "Waitangi Tribunal", "Te Pae Oranga", "Whakaorangia te mana tangata", "Te Reo Matatini", "Pāngarau", "Marautanga", "Māori Data Sovereignty", "mihi"]
// },
// {
// title: "Big jump in New Zealanders who say they'll get vaccinated",
// content: "Latest research shows more New Zealanders in major demographic groups will get a COVID-19 vaccine, as the number of doses administered reaches half a million, COVID-19 Response Minister Chris Hipkins said today...",
// date: new Date('2021-05-21').getTime(),
// readabilityScore: calculateReadabilityScore(27.81, 2.41),
// avgSentenceLength: 27.81,
// jargonPercentage: 2.41,
// jargon: ["demographic", "doses", "Ministry of Health", "Pasifika", "information campaigns", "vaccine rollout", "high-risk", "disabled", "mis-information", "dis-information", "medicine approval regime", "bulk of the vaccine", "DHBs"]
// },
// {
// title: "COVID-19 Information vital to Māori vaccination and immunisation programme",
// content: "Getting the right information is an important part of the process for whānau, hapū and iwi to be ready for the COVID-19 vaccination, Associate Minister for Health (Māori) Hon Peeni Henare said...",
// date: new Date('2021-05-26').getTime(),
// readabilityScore: calculateReadabilityScore(18.21, 3.47),
// avgSentenceLength: 18.21,
// jargonPercentage: 3.47,
// jargon: ["whānau", "hapū", "iwi", "rohe", "hauora providers", "health practitioners", "rangatahi", "pātai", "kaupapa", "by Māori for Māori communications", "hapori", "Iwi Communications Collective", "Te Puni Kōkiri", "www.karawhuia.nz", "whakapapa", "DHBs", "PBFF", "FTE"]
// },
// {
// title: "Air connectivity scheme helping recovery take off",
// content: "The Government has awarded a new round of airline support contracts through to the end of October 2021 to help keep New Zealand connected internationally and positioned for recovery, Transport Minister Michael Wood announced today...",
// date: new Date('2021-05-27').getTime(),
// readabilityScore: calculateReadabilityScore(24.76, 5.8),
// avgSentenceLength: 24.76,
// jargonPercentage: 5.8,
// jargon: ["airline support contracts", "International Airfreight Capacity (IAFC) scheme", "Maintaining International Air Connectivity (MIAC) scheme", "COVAX Facility", "MIQ facilities"]
// },
// {
// title: "Joint statement: Prime Ministers Jacinda Ardern and Scott Morrison",
// content: "Prime Minister Rt Hon Jacinda Ardern and Prime Minister the Hon Scott Morrison MP met in Queenstown on 31 May 2021 for the annual Australia-New Zealand Leaders' Meeting...",
// date: new Date('2021-05-31').getTime(),
// readabilityScore: calculateReadabilityScore(19.33, 14.41),
// avgSentenceLength: 19.33,
// jargonPercentage: 14.41,
// jargon: ["ACT Accelerator", "COVAX Facility", "PACER Plus Trade and Development Agreement", "Joint Food Standards System Agreement", "KiwiSaver accounts", "Skilled Independent (subclass 189) permanent residence visa", "SouthPAN", "STEM Dialogue", "Circular economy", "Consumer Data Right", "Trans-Tasman Cyber Security Research Programme", "Trans-Tasman Innovation Ecosystem", "Regional Comprehensive Economic Partnership (RCEP)", "ASEAN-Australia-New Zealand Free Trade Agreement (AANZFTA)", "Trans-Tasman Retirement Savings Portability Arrangement", "United Nations Convention on the Law of the Sea (UNCLOS)", "Joint Comprehensive Plan of Action", "Antarctic Treaty System"]
// },
// {
// title: "Joint Declaration on Strategic Partnership between the Government of New Zealand and the Government of the Kingdom of Spain",
// content: "On the occasion of the virtual Summit, on June 2 2021, between H.E. Ms. Jacinda Ardern, Prime Minister of New Zealand, and H.E. Mr. Pedro Sánchez Pérez-Castejón, President of the Government of the Kingdom of Spain...",
// date: new Date('2021-06-02').getTime(),
// readabilityScore: calculateReadabilityScore(22.56, 6),
// avgSentenceLength: 22.56,
// jargonPercentage: 6,
// jargon: ["multilateral", "Indigenous", "bilateral", "globalisation", "consultation", "internationalist", "modernised", "reinforced", "transformative", "Sustainable Development Goals", "reignite", "technological", "territorial", "multilateralism", "geoeconomic", "inclusive", "intellectual property", "vulnerabilities", "resilience", "essential", "gender equality", "gender", "bilateral", "sports", "memorandum", "promotion"]
// },
// {
// title: "APEC trade ministers' unite on COVID-19 vaccine steps and rejuvenating the WTO",
// content: "APEC trade ministers today committed to speeding up the cross-border flow of vaccines and related goods to fight the COVID-19 pandemic...",
// date: new Date('2021-06-06').getTime(),
// readabilityScore: calculateReadabilityScore(32.76, 1.5),
// avgSentenceLength: 32.76,
// jargonPercentage: 1.5,
// jargon: ["APEC", "GDP", "Customs", "multilateralism", "World Trade Organisation"]
// },
// {
// title: "Inclusive and sustainable economic growth centrepiece for APEC Ministers",
// content: "Ministers have connected from across the globe to discuss trade, economic recovery and technical cooperation during the final APEC Ministerial meeting of New Zealand's host year...",
// date: new Date('2021-11-10').getTime(),
// readabilityScore: calculateReadabilityScore(24.08, 3),
// avgSentenceLength: 24.08,
// jargonPercentage: 3,
// jargon: ["APEC", "COVID-19", "WTO"]
// },
// {
// title: "More freezers and South Island hub to support vaccine roll-out",
// content: "A South Island hub and 17 new ultra-low temperature freezers will help further prepare New Zealand for the ramp up of the vaccination programme in the second half of this year, COVID-19 Response Minister Chris Hipkins says...",
// date: new Date('2021-06-09').getTime(),
// readabilityScore: calculateReadabilityScore(23.36, 2.7),
// avgSentenceLength: 23.36,
// jargonPercentage: 2.7,
// jargon: ["ultra-low temperature", "accredited", "vaccination campaign", "vaccination hubs", "roll-out"]
// },
// {
// title: "Government guarantees free vaccines for every New Zealander",
// content: "The Government has invested $1.4 billion in New Zealand's COVID-19 vaccination programme to ensure every New Zealander can receive a free vaccination, COVID-19 Response Minister Chris Hipkins says...",
// date: new Date('2021-05-19').getTime(),
// readabilityScore: calculateReadabilityScore(17, 0.81),
// avgSentenceLength: 17,
// jargonPercentage: 0.81,
// jargon: ["COVAX", "DHBs", "Medsafe"]
// },
// {
// title: "Plan for vaccine rollout for general population announced",
// content: "New Zealanders over 60 will be offered a vaccination from July 28 and those over 55 from August 11, Prime Minister Jacinda Ardern announced today...",
// date: new Date('2021-06-17').getTime(),
// readabilityScore: calculateReadabilityScore(25.5, 7),
// avgSentenceLength: 25.5,
// jargonPercentage: 7,
// jargon: ["vaccination", "rollout", "age bands", "Book My Vaccine", "vaccination booking call centre", "mass vaccine events", "workplace vaccinations"]
// },
// {
// title: "APEC finance ministers and business leaders discuss COVID-19 recovery",
// content: "Finance ministers and business leaders from across the APEC region have connected to discuss the ongoing response to COVID-19...",
// date: new Date('2021-06-25').getTime(),
// readabilityScore: calculateReadabilityScore(24.57, 1),
// avgSentenceLength: 24.57,
// jargonPercentage: 1,
// jargon: ["APEC", "ABAC", "SMEs"]
// },
// {
// title: "More vaccinators coming on board for COVID-19 campaign",
// content: "Retired and overseas-trained health professionals and the wider health workforce can now join New Zealand's expanding vaccinator workforce, COVID-19 Response Minister Chris Hipkins said today...",
// date: new Date('2021-07-02').getTime(),
// readabilityScore: calculateReadabilityScore(21.22, 2.54),
// avgSentenceLength: 21.22,
// jargonPercentage: 2.54,
// jargon: ["Medicines Regulations", "Kaiāwhina", "DHBs", "Immunisation Advisory Centre", "Anaphylaxis", "Whānau", "Iwi", "Whānau ora", "Rongowhakaata", "Ngāti Porou"]
// },
// {
//   title: "New Zealand's largest vaccine shipment arrives ahead of schedule",
//   content: "The largest shipment of Pfizer vaccines yet has arrived two days ahead of schedule, thanks to a joint effort by the Ministry of Health, Pfizer and logistics company DHL, says COVID-19 Response Minister Chris Hipkins...",
//   date: new Date('2021-07-05').getTime(),
//   readabilityScore: calculateReadabilityScore(23, 2.55),
//   avgSentenceLength: 23,
//   jargonPercentage: 2.55,
//   jargon: ["Ministry of Health", "DHL", "COVID-19", "District Health Boards", "ultra-low", "vials"]
// },
// {
//   title: "Second COVID-19 vaccine receives provisional approval",
//   content: "New Zealand's regulatory authority Medsafe has granted provisional approval of the Janssen COVID-19 vaccine for individuals 18 years of age and older, COVID-19 Minister Chris Hipkins announced today...",
//   date: new Date('2021-07-07').getTime(),
//   readabilityScore: calculateReadabilityScore(19.29, 6.25),
//   avgSentenceLength: 19.29,
//   jargonPercentage: 6.25,
//   jargon: ["Janssen", "Medsafe", "COVID-19", "Pfizer", "Cabinet"]
// },
// {
//   title: "New Ambassador to Spain",
//   content: "Foreign Minister Nanaia Mahuta today announced the appointment of Tara Morton as the next Ambassador to Spain...",
//   date: new Date('2022-12-16').getTime(),
//   readabilityScore: calculateReadabilityScore(22.4, 7),
//   avgSentenceLength: 22.4,
//   jargonPercentage: 7,
//   jargon: ["Eurozone", "Strategic Partnership", "vaccination", "roll-out", "Chargee d'Affaires", "Permanent Mission", "High Commissioner"]
// },
// {
//   title: "Govt makes COVID-19 vaccinations mandatory for more border jobs",
//   content: "The Government is further strengthening the border against COVID-19 by making it mandatory for more of the workforce to be vaccinated, COVID-19 Response Minister Chris Hipkins announced today...",
//   date: new Date('2021-07-12').getTime(),
//   readabilityScore: calculateReadabilityScore(23.2, 2.42),
//   avgSentenceLength: 23.2,
//   jargonPercentage: 2.42,
//   jargon: ["COVID-19", "MIQ", "vaccination", "border", "vaccine", "airside", "aircrew", "specified"]
// },
// {
//   title: "Prime Minister's Speech to NZIIA Annual Conference",
//   content: "Ladies and gentlemen, distinguished guests, ata mārie, tēnā koutou katoa. It's a great pleasure to attend an event on such an important topic as New Zealand's future in the Indo-Pacific region...",
//   date: new Date('2021-07-14').getTime(),
//   readabilityScore: calculateReadabilityScore(20.06, 1.04),
//   avgSentenceLength: 20.06,
//   jargonPercentage: 1.04,
//   jargon: ["International Affairs", "MFAT", "Aotearoa", "double degree", "nuclear weapons", "United Nations", "overseas development", "COVAX Facility", "ASEAN", "Regional Comprehensive Economic Partnership", "FTA", "UK", "CPTPP", "Tatmadaw", "South China Sea", "White House Asia Coordinator", "Biden Administration", "norms-based order"]
// },
// {
//   title: "Early Pfizer shipment boosts vaccine schedule",
//   content: "The largest shipment of the Pfizer vaccine to date has arrived into New Zealand two days ahead of schedule, and doses are already being delivered to vaccination centres around the country, COVID-19 Response Minister Chris Hipkins says...",
//   date: new Date('2021-07-19').getTime(),
//   readabilityScore: calculateReadabilityScore(23.35, 8.5),
//   avgSentenceLength: 23.35,
//   jargonPercentage: 8.5,
//   jargon: ["logistics", "freight", "stock buffer", "DHBs", "rollout", "ramp up", "monitor", "footage"]
// },
// {
//   title: "Government backs critical health research",
//   content: "Research into some of New Zealanders' biggest health concerns including cancer, diabetes, and heart disease is getting crucial support in the latest round of health research funding, Health Minister Andrew Little announced today...",
//   date: new Date('2021-07-27').getTime(),
//   readabilityScore: calculateReadabilityScore(23.96, 10),
//   avgSentenceLength: 23.96,
//   jargonPercentage: 10,
//   jargon: ["Health Research Council of New Zealand", "General Project grants", "Rangahau Hauora Māori grants", "Pacific Project grants", "Programme grants", "vaccine hesitancy", "genetic diagnoses", "Kaupapa Māori", "epidemiologist", "emerging Leader Fellowship"]
// },
// {
//   title: "Focus on South Island tourism and regional economies",
//   content: "South Island regions hardest hit by the closure of international borders are the focus of a visit by Tourism and Regional Development Minister Stuart Nash over the next two days...",
//   date: new Date('2021-03-17').getTime(),
//   readabilityScore: calculateReadabilityScore(19.74, 12.68),
//   avgSentenceLength: 19.74,
//   jargonPercentage: 12.68,
//   jargon: ["Tourism and Regional Development Minister", "Provincial Growth Fund", "Trans-Tasman bubble", "COVID19", "Pfizer/BioNTech vaccine", "Tourism Recovery Package", "Provincial Development Unit", "concessionary loan", "domestic tourism", "destination marketing agencies", "Fiordland", "Milford Highway Fibre Connection", "inner-city regeneration project", "salmon hatchery", "forestry grants", "TRG", "Lakes District Museum", "Clutha Gold Cycle Trail", "SH6/SH8b intersection"]
// },
// {
//   title: "New Zealand's support for Fiji's COVID-19 response continues with vaccine delivery, operational support",
//   content: "Foreign Minister Nanaia Mahuta has announced further support for Fiji, including funding support for nursing staff and 100,000 doses of vaccines due to arrive in country today...",
//   date: new Date('2021-08-03').getTime(),
//   readabilityScore: calculateReadabilityScore(22, 3),
//   avgSentenceLength: 22,
//   jargonPercentage: 3,
//   jargon: ["AstraZeneca", "PPE", "testing swabs"]
// },
// {
//   title: "Foreign Minister to take part in ASEAN-related meetings",
//   content: "Foreign Minister Nanaia Mahuta will today begin a suite of meetings with her ASEAN and East Asia Summit counterparts, starting with the 11th East Asia Summit (EAS) Foreign Ministers' Meeting tonight...",
//   date: new Date('2021-08-04').getTime(),
//   readabilityScore: calculateReadabilityScore(23.875, 10),
//   avgSentenceLength: 23.875,
//   jargonPercentage: 10,
//   jargon: ["ASEAN", "Indo-Pacific", "COVID-19", "equitable", "sustainable", "green", "Aotearoa", "political", "strategic", "multilateral"]
// },
// {
//   title: "Vaccine bookings brought forward for New Zealanders aged 50-plus",
//   content: "Following strong uptake from the 60-plus and 55-plus age groups, COVID-19 vaccine bookings for New Zealanders aged 50-plus are being brought forward to Friday 13 August, earlier than planned, COVID-19 Response Minister Chris Hipkins said today...",
//   date: new Date('2021-08-09').getTime(),
//   readabilityScore: calculateReadabilityScore(15.04, 3.17),
//   avgSentenceLength: 15.04,
//   jargonPercentage: 3.17,
//   jargon: ["COVID-19", "vaccine", "bookings", "age groups", "Response Minister", "doses", "booking system", "call centre", "Healthline", "Consignments"]
// },
// {
//   title: "COVID-19 vaccinator workforce tracking well for peak of rollout",
//   content: "New Zealand's COVID-19 vaccinator workforce continues to expand with more than 10,000 people having now completed Pfizer vaccine training, COVID-19 Response Minister Chris Hipkins says...",
//   date: new Date('2021-08-10').getTime(),
//   readabilityScore: calculateReadabilityScore(22.27, 1.60),
//   avgSentenceLength: 22.27,
//   jargonPercentage: 1.60,
//   jargon: ["vaccinator", "kaiāwhina", "workstream", "kaiāwhina COVID-19 trained vaccinators", "kaiāwhina", "kaiāwhinavaccinators", "provisional vaccinator", "IMAC", "hapū"]
// },
// {
//   title: "Government releases expert advice on Reconnecting New Zealanders",
//   content: "Group recommends phased re-opening of borderMore infectious Delta variant requires high vaccine uptake before border can be safely openedSuggests risk based factors be taken into account at border such as vaccination status and Covid-19 prevalence in countries visitedGroup confirms the viability of maintaining elimination strategy...",
//   date: new Date('2021-08-11').getTime(),
//   readabilityScore: calculateReadabilityScore(34.75, 7.8),
//   avgSentenceLength: 34.75,
//   jargonPercentage: 7.8,
//   jargon: ["phased", "Delta variant", "vaccination status", "Covid-19", "prevalence", "elimination strategy", "Strategic Covid-19 Public Health Advisory Group", "expert advice", "vaccination programme", "preparatory work", "emergence", "reconnecting", "bolster", "whānau", "MIQ", "rapid testing", "contact tracing", "Elimination Strategy", "zero tolerance", "lockdowns", "targeted public health measures", "epidemiology", "infectious diseases", "ongoing COVID-19 response"]
// },
// {
//   title: "Government sets out plan to reconnect New Zealanders to the world",
//   content: "Vaccination rollout will speed up, with all eligible ages able to book in their vaccine by 1 SeptemberMove to 6 weeks between doses to ensure more NZers at least partially vaccinated as soon as possible in face of Delta risk...",
//   date: new Date('2021-08-12').getTime(),
//   readabilityScore: calculateReadabilityScore(29.85, 4.63),
//   avgSentenceLength: 29.85,
//   jargonPercentage: 4.63,
//   jargon: ["rollout", "self-isolation", "testing", "vaccine", "border settings", "elimination strategy", "strategic", "advisory group", "vaccination process", "eligibility dates", "phased introduction", "risk-based approach", "quarantine free", "MIQ", "self-isolation pilot", "traveller health declaration", "pre-departure testing", "contact tracing"]
// },
// {
//   title: "Number of New Zealanders fully vaccinated passes 1 million",
//   content: "The COVID-19 vaccination programme has reached its most significant milestone to date, with more than 1 million people now fully vaccinated, says Minister for COVID-19 Response Chris Hipkins...",
//   date: new Date('2021-08-22').getTime(),
//   readabilityScore: calculateReadabilityScore(21.73, 3.20),
//   avgSentenceLength: 21.73,
//   jargonPercentage: 3.20,
//   jargon: ["COVID-19", "vaccination programme", "doses", "vaccination clinics", "Book My Vaccine system", "essential workers", "district health boards", "primary care providers", "general practices", "pharmacies"]
// },
// {
//   title: "Additional Pfizer vaccines to arrive tomorrow",
//   content: "More than a quarter of a million additional doses of the Pfizer vaccine are on their way from Spain to New Zealand, Prime Minister Jacinda Ardern announced today...",
//   date: new Date('2021-09-09').getTime(),
//   readabilityScore: calculateReadabilityScore(21.21, 3),
//   avgSentenceLength: 21.21,
//   jargonPercentage: 3,
//   jargon: ["Pfizer", "vaccination programme", "European Commission"]
// },
// {
//   title: "Next phase of support for Fiji's COVID-19 response announced",
//   content: "A further NZ$12 million of support for Fiji's COVID-19 response has been announced by Foreign Minister Hon Nanaia Mahuta today. The package builds on previous tranches of assistance Aotearoa New Zealand has provided to Fiji, totalling over NZ$50 million...",
//   date: new Date('2021-09-09').getTime(),
//   readabilityScore: calculateReadabilityScore(24.5, 7),
//   avgSentenceLength: 24.5,
//   jargonPercentage: 7,
//   jargon: ["COVID-19", "Aotearoa", "PPE", "surge support", "Global Appeal", "vaccine roll out", "surge capacity"]
// },
// {
//   title: "Half a million Pfizer vaccines from Denmark",
//   content: "The Government has secured an extra half a million doses of Pfizer COVID-19 vaccines from Denmark that will start arriving in New Zealand within days, Prime Minister Jacinda Ardern announced today...",
//   date: new Date('2021-09-12').getTime(),
//   readabilityScore: calculateReadabilityScore(27.41, 2),
//   avgSentenceLength: 27.41,
//   jargonPercentage: 2,
//   jargon: ["Pfizer", "COVID-19"]
// },
// {
//   title: "Innovative te reo prediction tool announced in Te Wiki o Te Reo Māori",
//   content: "A new Māori language prediction tool will play a key role in tracking our te reo Māori revitalisation efforts, Minister for Māori Development Willie Jackson announced today...",
//   date: new Date('2021-09-13').getTime(),
//   readabilityScore: calculateReadabilityScore(17, 3.25),
//   avgSentenceLength: 17,
//   jargonPercentage: 3.25,
//   jargon: ["revitalisation", "conversational", "fluent", "computer-generated", "forward-looking", "implications", "collaboration", "insights", "iwi", "whānau", "pipeline", "traction", "Aotearoa"]
// },
// {
//   title: "Government funding to fight infectious diseases",
//   content: "$36 million for research into Covid-19 and other infectious diseasesThe investment will improve our readiness for future pandemicsResearch will focus on prevention, control, and management of infectious diseases...",
//   date: new Date('2021-09-19').getTime(),
//   readabilityScore: calculateReadabilityScore(26.93, 2.65),
//   avgSentenceLength: 26.93,
//   jargonPercentage: 2.65,
//   jargon: ["Infectious Diseases", "Covid-19", "Pandemics", "Research Platform", "Disease Transmission", "Diagnostics", "Therapeutics", "Pandemic Scientists", "Proposals", "Host"]
// },
// {
// title: "Joint Statement: New Zealand and Australian Trade Ministers",
// content: "Hon Damien O'Connor MP, New Zealand Minister for Trade and Export Growth, and Hon Dan Tehan MP, Australian Minister for Trade, Tourism and Investment, met virtually on Monday 20 September to advance trans-Tasman cooperation under the Australia-New Zealand Closer Economic Relations Trade Agreement (CER)...",
// date: new Date('2021-09-20').getTime(),
// readabilityScore: calculateReadabilityScore(30.06, 14.41),
// avgSentenceLength: 30.06,
// jargonPercentage: 14.41,
// jargon: ["Minister", "Trade", "Export", "Growth", "Trans-Tasman", "Cooperation", "Agreement", "Economic", "Pandemic", "Exporters", "Resilience", "Single Economic Market", "Supply chains", "Secure Trade Lane", "Efficiencies"]
// },
// {
// title: "Funding boost supports ongoing Māori COVID-19 response",
// content: "The Government is responding to the need by whānau Māori and Māori Health providers to support their ongoing work responding to COVID-19 and to continue increasing rates of Māori vaccination, Associate Minister for Health (Māori Health), Peeni Henare and Minister for Māori Development Willie Jackson announced today...",
// date: new Date('2021-09-21').getTime(),
// readabilityScore: calculateReadabilityScore(22.92, 21),
// avgSentenceLength: 22.92,
// jargonPercentage: 21,
// jargon: ["COVID-19", "Māori", "vaccination", "whānau", "health sector", "testing", "contact tracing", "case management", "mental health", "Ministry of Health", "Te Puni Kōkiri", "reprioritised fund", "critical services", "contestable process", "iwi organizations"]
// },
// {
// title: "New Zealand donates more COVID-19 vaccines to COVAX and the Pacific",
// content: "Foreign Affairs Minister Hon Nanaia Mahuta and Associate Health Minister Aupito William Sio announced today that New Zealand is donating additional Pfizer vaccines to the Pacific and AstraZeneca vaccines to the COVAX Facility, to support equitable access to COVID-19 vaccines...",
// date: new Date('2021-09-24').getTime(),
// readabilityScore: calculateReadabilityScore(19.6, 7),
// avgSentenceLength: 19.6,
// jargonPercentage: 7,
// jargon: ["COVAX", "AstraZeneca", "Pfizer"]
// },

// {
// title: "Self-isolation pilot to start with 150 people",
// content: "The goal of safely re-opening our borders and developing new ways for people to travel will start with a self-isolation pilot, COVID-19 Response Minister Chris Hipkins confirmed today...",
// date: new Date('2021-09-27').getTime(),
// readabilityScore: calculateReadabilityScore(17.6, 3.5),
// avgSentenceLength: 17.6,
// jargonPercentage: 3.5,
// jargon: ["self-isolation", "pilot", "Reconnecting New Zealanders", "very high-risk countries", "operational readiness", "Expressions of Interest (EOI)", "resident visa", "Pfizer vaccine", "arrival timeframe", "contactless deliveries", "Ministry of Health"]
// },
// {
// title: "One more day for border workers to get vaccinated, rates already above 98%",
// content: "New Zealand's border workers have stepped up to help protect their whānau and fellow Kiwis, COVID-19 Response Minister Chris Hipkins said today...",
// date: new Date('2021-09-29').getTime(),
// readabilityScore: calculateReadabilityScore(19, 10),
// avgSentenceLength: 19,
// jargonPercentage: 10,
// jargon: ["COVID-19", "Pfizer", "MIQ"]
// },
// {
// title: "Government response to independent Pharmac Review",
// content: "The Government has released its response to the recommendations of the final report of the independent Pharmac Review panel, welcoming its insights as well as Pharmac's commitment to improve in its role for better health equity and outcomes for all New Zealanders...",
// date: new Date('2022-06-01').getTime(),
// readabilityScore: calculateReadabilityScore(25.1, 2.91),
// avgSentenceLength: 25.1,
// jargonPercentage: 2.91,
// jargon: ["Pharmac", "Medicines", "Consultations", "Drug-buying", "Pharmaceutical", "Tiriti o Waitangi", "Pae Ora Bill", "Collaborative", "Integrally"]
// },
// {
// title: "Access to COVID-19 boosters for those most at risk",
// content: "Second COVID-19 Pfizer booster dose recommended for the most vulnerable six months after first boosterApproximately 850,000 New Zealanders expected to be eligibleChanges ensure more equitable access to second booster...",
// date: new Date('2022-06-07').getTime(),
// readabilityScore: calculateReadabilityScore(27.72, 15.5),
// avgSentenceLength: 27.72,
// jargonPercentage: 15.5,
// jargon: ["Pfizer", "booster", "Medicines Act", "vaccinators", "prescription", "Epidemic Preparedness", "COVID-19 Vaccine Technical Advisory Group", "waning", "immunity", "Director General of Health", "Ayesha Verrall", "Omicron"]
// },
// {
// title: "Auckland restrictions eased in steps",
// content: "Prime Minister Jacinda Ardern has today set out a roadmap for Auckland to carefully move out of current Covid-19 restrictions...",
// date: new Date('2021-10-04').getTime(),
// readabilityScore: calculateReadabilityScore(25.73, 1.5),
// avgSentenceLength: 25.73,
// jargonPercentage: 1.5,
// jargon: ["Alert Level", "Delta outbreak", "vaccination rates", "Cabinet", "phasing", "vaccine certificates"]
// },
// {
// title: "Two million Kiwis fully vaccinated",
// content: "More than 2 million people have now received two doses of the COVID-19 vaccine, marking a significant milestone for the largest vaccination programme in Aotearoa New Zealand's history, Minister for COVID-19 Response Chris Hipkins says...",
// date: new Date('2021-10-04').getTime(),
// readabilityScore: calculateReadabilityScore(23.07, 4),
// avgSentenceLength: 23.07,
// jargonPercentage: 4,
// jargon: ["vaccination programme", "COVID-19", "vaccination clinics", "Book My Vaccine system"]
// },
// {
// title: "COVID-19 vaccine roll-out plan",
// content: "Targeted roll-out over next 3-4 months will start to reach 2 million Kiwis in most at risk groupsPlan prioritises people most at risk of harm if they get the virus and those who live and work in places where they are most likely to pick up COVID-19...",
// date: new Date('2021-03-10').getTime(),
// readabilityScore: calculateReadabilityScore(23.13, 1.01),
// avgSentenceLength: 23.13,
// jargonPercentage: 1.01,
// jargon: ["roll-out", "prioritises", "harm", "COVID-19", "outbreaks", "prioritisation", "sequencing", "frontline", "hauora"]
// },
// {
// title: "Tokelau champions language and culture",
// content: "COVID-19 continues to be a powerful reminder of the importance of language and culture to the wellbeing of our Pacific communities, said the Minister for Pacific Peoples, Aupito William Sio...",
// date: new Date('2021-10-24').getTime(),
// readabilityScore: calculateReadabilityScore(20.30, 1.4),
// avgSentenceLength: 20.30,
// jargonPercentage: 1.4,
// jargon: ["COVID-19"]
// },
// {
// title: "Record day for Māori vaccinations",
// content: "More than10,000 vaccinations were administered to Māori yesterday, the highest number in the vaccine campaign so far, Associate Minister of Health (Maori Health) Peeni Henare announced...",
// date: new Date('2021-10-09').getTime(),
// readabilityScore: calculateReadabilityScore(19.56, 11),
// avgSentenceLength: 19.56,
// jargonPercentage: 11,
// jargon: ["motu", "whānau", "hangi", "kaumātua", "rangatahi", "Tāmaki Makaurau", "iwi", "motu"]
// },
// {
// title: "Mandatory vaccination for two workforces",
// content: "High-risk workers in the health and disability sector to be fully vaccinated by 1 December, 2021, and to receive their first dose by 30 OctoberSchool and early learning staff and support people who have contact with children and students to be fully vaccinated by 1 January, 2022, and to receive their first dose by 15 November...",
// date: new Date('2021-10-11').getTime(),
// readabilityScore: calculateReadabilityScore(24.54, 18),
// avgSentenceLength: 24.54,
// jargonPercentage: 18,
// jargon: ["disability", "vaccination", "COVID-19", "Minister", "pandemic", "infection", "disease", "disruption", "sectors", "exemptions", "MIQ", "healthcare", "Intensive Care Units", "aged residential care", "kaupapa Māori", "Non-Government Organisations", "providers", "register", "contractors", "kura", "Alert Level", "testing", "tertiary education"]
// },
// {
// title: "Aviation support extension provides runway for recovery",
// content: "The Government has extended support for the international aviation sector to maintain international passenger services, remain connected with important trade partners and support the economic recovery, Transport Minister Michael Wood announced today...",
// date: new Date('2021-10-01').getTime(),
// readabilityScore: calculateReadabilityScore(24.41, 3.19),
// avgSentenceLength: 24.41,
// jargonPercentage: 3.19,
// jargon: ["aviation", "economic recovery", "Maintaining International Air Connectivity (MIAC) scheme", "airfreight", "vaccines", "business", "critical supplies", "markets", "Ministry of Transport", "routes", "Reconnecting New Zealanders strategy", "border restrictions", "freight forwarder"]
// },
// {
// title: "Super Māori turnout for Super Saturday",
// content: "Māori have put a superb effort into mobilising to get vaccinated over Super Saturday, with thousands rolling up their sleeves to protect themselves, their whānau and communities from COVID-19, Associate Health Minister Peeni Henare says...",
// date: new Date('2021-10-17').getTime(),
// readabilityScore: calculateReadabilityScore(22.66, 4.38),
// avgSentenceLength: 22.66,
// jargonPercentage: 4.38,
// jargon: ["vaccinated", "doses", "fully vaccinated", "eligible", "whānau", "programmes", "mahi", "Aotearoa", "marae-based", "drive-through", "disabled"]
// },
// {
// title: "Limited change to onsite learning – for senior secondary students – in Level 3 regions",
// content: "Onsite learning at schools in Level 3 regions will start from next week for senior secondary school students to prepare for end of year exams, Education Minister Chris Hipkins said today...",
// date: new Date('2021-10-20').getTime(),
// readabilityScore: calculateReadabilityScore(31, 2.22),
// avgSentenceLength: 31,
// jargonPercentage: 2.22,
// jargon: ["end of year exams", "trade-offs", "public health measures", "contact tracing", "rostered attendance", "mitigation", "health advice", "bubbles", "sneeze etiquette", "QR code posters", "contact tracing register"]
// },
// {
// title: "Monkeypox vaccination available to eligible people from next week",
// content: "A vaccine for people at risk of mpox (Monkeypox) will be available if prescribed by a medical practitioner to people who meet eligibility criteria from Monday 16 January, says Associate Minister of Health Dr Ayesha Verrall...",
// date: new Date('2023-01-09').getTime(),
// readabilityScore: calculateReadabilityScore(18.48, 3.86),
// avgSentenceLength: 18.48,
// jargonPercentage: 3.86,
// jargon: ["mpox", "sexual partners", "eligible", "medical practitioner", "vials", "Aotearoa", "cisgender", "Medicines Act", "consultation", "Medsafe", "community organisations", "public health teams", "GP", "sexual health clinic", "Editor's note"]
// },
// {
// title: "New COVID-19 Protection Framework delivers greater freedoms for vaccinated New Zealanders",
// content: "New COVID-19 Protection Framework provides pathway out of lockdown and ability for businesses and events to re-open to vaccinated New ZealandersSimpler framework to minimise cases and hospitalisations without use of widespread lockdowns...",
// date: new Date('2021-10-22').getTime(),
// readabilityScore: calculateReadabilityScore(26.53, 0.53),
// avgSentenceLength: 26.53,
// jargonPercentage: 0.53,
// jargon: ["COVID-19 Protection Framework", "DHBs", "vaccination rates"]
// },
// {
// title: "Isolation period reduced from 10 to 7 days, third vaccine becomes available",
// content: "COVID-19 cases and household contacts to isolate for a weekTwo negative rapid antigen tests required for household contacts250,000 Novavax vaccines here, people can book from tomorrow...",
// date: new Date('2022-03-09').getTime(),
// readabilityScore: calculateReadabilityScore(20.06, 10.6),
// avgSentenceLength: 20.06,
// jargonPercentage: 10.6,
// jargon: ["rapid antigen tests", "Omicron", "isolation period", "public health advice", "infectiousness", "transmission", "chain of transmission", "reinfection", "COVID-19 Protection Framework", "Nuvaxovid"]
// },
// {
// title: "New measures to tackle COVID-19 and flu",
// content: "Expanded eligibility for antiviralsMaking COVID-19 medicines available in pharmacies to help ease pressure on GPsSignificantly expanding access to free RATs and masks...",
// date: new Date('2022-07-14').getTime(),
// readabilityScore: calculateReadabilityScore(22.3, 0.71),
// avgSentenceLength: 22.3,
// jargonPercentage: 0.71,
// jargon: ["antivirals", "GPs", "RATs", "Omicron", "BA.5", "Pharmac"]
// },
// {
// title: "Govt backs business to vaccinate workforces",
// content: "Vaccination will be required for all workers at businesses where customers need to show COVID-19 Vaccination Certificates, such as hospitality and close-contact businesses...",
// date: new Date('2021-10-26').getTime(),
// readabilityScore: calculateReadabilityScore(22.92, 1.95),
// avgSentenceLength: 22.92,
// jargonPercentage: 1.95,
// jargon: ["Vaccination", "COVID-19", "Vaccination Certificates", "risk assessment", "WorkSafe", "health and safety guidelines", "Privacy Commissioner", "MBIE"]
// },
// {
// title: "Booster vaccine available from end of November",
// content: "Booster doses of the Pfizer vaccine will start being administered from 29 November, COVID-19 Response Minister Chris Hipkins said today...",
// date: new Date('2021-11-15').getTime(),
// readabilityScore: calculateReadabilityScore(22.85, 0.94),
// avgSentenceLength: 22.85,
// jargonPercentage: 0.94,
// jargon: ["Medsafe", "vaccine technical advisory group", "Protection Framework", "Alert Level system", "book my vaccine website"]
// },
// {
// title: "Government accelerates efforts to support disabled peoples vaccination experiences",
// content: "Launch of 'The Manaakitanga Journey'tool to help disabled people get vaccinated against COVID-19Aone-stop shop online containing COVID-19 information, with accessible format considerations, and locations of Super Accessible Vaccination sites...",
// date: new Date('2021-10-28').getTime(),
// readabilityScore: calculateReadabilityScore(33.5, 2.62),
// avgSentenceLength: 33.5,
// jargonPercentage: 2.62,
// jargon: ["Manaakitanga", "super accessible", "New Zealand Sign Language", "disability sector", "Office for Disability Issues", "Ministry of Health", "DHBs", "Disability Supports Services", "supported decision making", "alternative formats"]
// },
// {
// title: "First step in managed isolation changes, expanding QFT with Pacific",
// content: "Halving of time overseas arrivals spend in MIQ facility to seven days followed by home isolation until they return a negative day 9 test, from 14 NovemberExpanded quarantine free travel for eligible one-way travellers from some Pacific nations, from 8 November...",
// date: new Date('2021-10-28').getTime(),
// readabilityScore: calculateReadabilityScore(24.60, 0.28),
// avgSentenceLength: 24.60,
// jargonPercentage: 0.28,
// jargon: ["MIQ (Managed Isolation and Quarantine)"]
// },
// {
// title: "$23.5m to support community-led Māori vaccination campaigns",
// content: "The Government has approved $23.5 million for eight Māori organisations and iwi aimed at boosting Māori vaccination rates, through the new $120 million Māori Communities COVID-19 Fund...",
// date: new Date('2021-11-02').getTime(),
// readabilityScore: calculateReadabilityScore(18.88, 2.9),
// avgSentenceLength: 18.88,
// jargonPercentage: 2.9,
// jargon: ["iwi", "mahi", "DHBs", "mihi", "marae", "wānanga", "kura kaupapa", "Te Puni Kōkiri", "Te Arawhiti", "rangatahi", "kaiārahi", "rohe", "Te Waipounamu", "Te Pūtahitanga o Te Waipounamu", "Ōtautahi", "Te Tai Poutini"]
// },
// {
// title: "Vaccine mandate for border and corrections workers to end",
// content: "The Government has announced an end to the requirement for border workers and corrections staff to be fully vaccinated. This will come into place from 2 July 2022...",
// date: new Date('2022-06-28').getTime(),
// readabilityScore: calculateReadabilityScore(18.17, 3),
// avgSentenceLength: 18.17,
// jargonPercentage: 3,
// jargon: ["Vaccine mandates", "COVID-19", "Aotearoa"]
// },
// {
// title: "90 percent first dose target reached in Auckland",
// content: "Counties Manukau DHB has reached 90 percent first doses today, meaning all three Auckland DHBs have now crossed the 90 percent threshold for first doses, a key milestone on the path to Auckland opening up, Minister for COVID-19 Response Chris Hipkins says...",
// date: new Date('2021-11-07').getTime(),
// readabilityScore: calculateReadabilityScore(18.63, 1.85),
// avgSentenceLength: 18.63,
// jargonPercentage: 1.85,
// jargon: ["DHB", "COVID-19", "traffic light system", "Māori", "Pacific"]
// },
// {
// title: "Prime Minister to chair APEC Leaders Meeting",
// content: "Prime Minister Jacinda Ardern has today marked the beginning of the fully virtual APEC 2021 Leaders Week, where political, business and young leaders come together for a series of events that conclude New Zealand's host year...",
// date: new Date('2021-11-08').getTime(),
// readabilityScore: calculateReadabilityScore(33.41, 2.38),
// avgSentenceLength: 33.41,
// jargonPercentage: 2.38,
// jargon: ["APEC", "PPE", "decarbonise", "standstill", "fossil fuel subsides", "paperless customs procedures", "roadmap", "APEC Ministerial Meeting", "APEC CEO Summit", "APEC Business Advisory Council"]
// }
// ];

const vaccinationDataString = `
date vaccinations
14/02/2021  0
15/02/2021  1
16/02/2021  1
17/02/2021  1
18/02/2021  4
19/02/2021  6
20/02/2021  16
21/02/2021  24
22/02/2021  88
23/02/2021  139
24/02/2021  255
25/02/2021  410
26/02/2021  638
27/02/2021  820
28/02/2021  937
01/03/2021  1074
02/03/2021  1235
03/03/2021  1401
04/03/2021  1477
05/03/2021  1430
06/03/2021  1325
07/03/2021  1272
08/03/2021  1224
09/03/2021  1215
10/03/2021  1120
11/03/2021  1077
12/03/2021  1044
13/03/2021  1066
14/03/2021  1078
15/03/2021  1193
16/03/2021  1298
17/03/2021  1397
18/03/2021  1502
19/03/2021  1705
20/03/2021  1778
21/03/2021  1920
22/03/2021  1974
23/03/2021  2050
24/03/2021  2271
25/03/2021  2455
26/03/2021  2770
27/03/2021  2879
28/03/2021  2820
29/03/2021  3203
30/03/2021  3628
31/03/2021  4091
01/04/2021  4534
02/04/2021  4156
03/04/2021  4115
04/04/2021  4084
05/04/2021  3552
06/04/2021  3451
07/04/2021  3518
08/04/2021  3772
09/04/2021  4535
10/04/2021  4851
11/04/2021  5223
12/04/2021  6160
13/04/2021  6656
14/04/2021  6783
15/04/2021  6854
16/04/2021  7161
17/04/2021  7317
18/04/2021  7104
19/04/2021  7013
20/04/2021  7105
21/04/2021  7395
22/04/2021  7637
23/04/2021  7950
24/04/2021  7893
25/04/2021  7937
26/04/2021  7240
27/04/2021  7373
28/04/2021  7486
29/04/2021  7780
30/04/2021  8025
01/05/2021  8143
02/05/2021  8310
03/05/2021  9522
04/05/2021  10041
05/05/2021  10583
06/05/2021  10947
07/05/2021  11444
08/05/2021  11698
09/05/2021  11670
10/05/2021  11851
11/05/2021  12062
12/05/2021  12137
13/05/2021  12246
14/05/2021  12129
15/05/2021  11983
16/05/2021  12108
17/05/2021  11972
18/05/2021  11924
19/05/2021  11948
20/05/2021  11903
21/05/2021  11830
22/05/2021  12078
23/05/2021  12020
24/05/2021  12299
25/05/2021  12661
26/05/2021  13127
27/05/2021  13330
28/05/2021  14063
29/05/2021  14386
30/05/2021  14585
31/05/2021  14795
01/06/2021  15169
02/06/2021  15491
03/06/2021  16387
04/06/2021  16352
05/06/2021  16254
06/06/2021  16255
07/06/2021  14946
08/06/2021  15220
09/06/2021  13855
10/06/2021  13890
11/06/2021  14050
12/06/2021  14392
13/06/2021  14692
14/06/2021  16493
15/06/2021  16547
16/06/2021  18404
17/06/2021  18387
18/06/2021  18280
19/06/2021  18329
20/06/2021  18329
21/06/2021  18271
22/06/2021  18342
23/06/2021  18424
24/06/2021  18588
25/06/2021  18719
26/06/2021  19055
27/06/2021  19016
28/06/2021  18854
29/06/2021  18604
30/06/2021  18303
01/07/2021  18092
02/07/2021  17856
03/07/2021  17581
04/07/2021  17493
05/07/2021  17401
06/07/2021  17393
07/07/2021  17430
08/07/2021  17666
09/07/2021  17883
10/07/2021  18325
11/07/2021  18500
12/07/2021  18769
13/07/2021  19003
14/07/2021  19247
15/07/2021  19128
16/07/2021  19164
17/07/2021  19268
18/07/2021  19424
19/07/2021  20097
20/07/2021  21258
21/07/2021  22562
22/07/2021  23787
23/07/2021  25104
24/07/2021  26292
25/07/2021  27042
26/07/2021  28213
27/07/2021  29400
28/07/2021  30487
29/07/2021  31612
30/07/2021  33197
31/07/2021  35161
01/08/2021  36400
02/08/2021  37058
03/08/2021  37609
04/08/2021  38165
05/08/2021  38460
06/08/2021  38450
07/08/2021  38199
08/08/2021  37892
09/08/2021  38379
10/08/2021  38985
11/08/2021  39484
12/08/2021  40449
13/08/2021  41159
14/08/2021  42149
15/08/2021  42890
16/08/2021  44015
17/08/2021  45331
18/08/2021  38406
19/08/2021  35736
20/08/2021  37446
21/08/2021  38953
22/08/2021  40652
23/08/2021  43500
24/08/2021  47330
25/08/2021  60108
26/08/2021  69120
27/08/2021  73849
28/08/2021  77419
29/08/2021  78991
30/08/2021  80755
31/08/2021  81291
01/09/2021  81486
02/09/2021  81079
03/09/2021  80471
04/09/2021  80393
05/09/2021  79033
06/09/2021  77383
07/09/2021  75476
08/09/2021  72066
09/09/2021  68008
10/09/2021  64795
11/09/2021  62459
12/09/2021  61755
13/09/2021  60093
14/09/2021  58545
15/09/2021  57948
16/09/2021  57846
17/09/2021  57236
18/09/2021  56035
19/09/2021  55003
20/09/2021  54321
21/09/2021  53145
22/09/2021  51270
23/09/2021  49608
24/09/2021  48163
25/09/2021  47862
26/09/2021  47574
27/09/2021  46187
28/09/2021  44829
29/09/2021  43553
30/09/2021  43093
01/10/2021  42654
02/10/2021  42447
03/10/2021  42774
04/10/2021  44947
05/10/2021  47700
06/10/2021  51928
07/10/2021  57122
08/10/2021  62615
09/10/2021  67168
10/10/2021  69337
11/10/2021  71262
12/10/2021  72591
13/10/2021  72389
14/10/2021  70304
15/10/2021  67957
16/10/2021  74984
17/10/2021  73186
18/10/2021  69360
19/10/2021  65014
20/10/2021  61297
21/10/2021  57484
22/10/2021  53936
23/10/2021  41260
24/10/2021  39736
25/10/2021  35132
26/10/2021  35042
27/10/2021  34491
28/10/2021  35041
29/10/2021  34806
30/10/2021  34844
31/10/2021  35010
01/11/2021  37454
02/11/2021  35592
03/11/2021  33902
04/11/2021  31218
05/11/2021  29088
06/11/2021  27826
07/11/2021  26980
08/11/2021  26119
09/11/2021  25191
10/11/2021  24474
11/11/2021  24028
12/11/2021  23333
13/11/2021  22370
14/11/2021  22423
15/11/2021  22454
16/11/2021  22286
17/11/2021  22058
18/11/2021  21749
19/11/2021  21687
20/11/2021  20886
21/11/2021  20218
22/11/2021  19355
23/11/2021  19073
24/11/2021  18859
25/11/2021  18536
26/11/2021  18532
27/11/2021  19079
28/11/2021  19661
29/11/2021  23357
30/11/2021  26514
01/12/2021  29458
02/12/2021  32443
03/12/2021  34767
04/12/2021  34991
05/12/2021  34683
06/12/2021  32315
07/12/2021  29819
08/12/2021  27396
09/12/2021  24793
10/12/2021  22170
11/12/2021  20594
12/12/2021  19957
13/12/2021  19033
14/12/2021  18500
15/12/2021  18171
16/12/2021  18131
17/12/2021  18196
18/12/2021  18100
19/12/2021  18060
20/12/2021  18305
21/12/2021  18493
22/12/2021  18811
23/12/2021  18794
24/12/2021  17648
25/12/2021  15440
26/12/2021  14656
27/12/2021  12312
28/12/2021  9909
29/12/2021  10024
30/12/2021  10308
31/12/2021  10900
01/01/2022  11089
02/01/2022  11266
03/01/2022  11561
04/01/2022  11849
05/01/2022  15250
06/01/2022  19013
07/01/2022  23708
08/01/2022  27090
09/01/2022  28472
10/01/2022  35309
11/01/2022  41768
12/01/2022  41817
13/01/2022  41478
14/01/2022  40871
15/01/2022  40906
16/01/2022  40719
17/01/2022  40987
18/01/2022  41544
19/01/2022  42220
20/01/2022  43144
21/01/2022  44908
22/01/2022  47102
23/01/2022  49642
24/01/2022  52352
25/01/2022  55238
26/01/2022  57623
27/01/2022  59123
28/01/2022  59779
29/01/2022  59903
30/01/2022  58422
31/01/2022  52066
01/02/2022  48433
02/02/2022  45007
03/02/2022  43503
04/02/2022  45118
05/02/2022  47139
06/02/2022  48391
07/02/2022  47041
08/02/2022  49161
09/02/2022  51416
10/02/2022  51627
11/02/2022  49904
12/02/2022  49994
13/02/2022  49339
14/02/2022  53662
15/02/2022  51460
16/02/2022  49089
17/02/2022  46895
18/02/2022  44261
19/02/2022  41705
20/02/2022  40924
21/02/2022  37998
22/02/2022  34949
23/02/2022  32570
24/02/2022  31043
25/02/2022  29851
26/02/2022  29137
27/02/2022  28887
28/02/2022  28268
01/03/2022  27267
02/03/2022  26273
03/03/2022  24648
04/03/2022  22251
05/03/2022  20068
06/03/2022  18828
07/03/2022  16824
08/03/2022  15304
09/03/2022  13880
10/03/2022  12741
11/03/2022  11567
12/03/2022  10436
13/03/2022  10057
14/03/2022  9807
15/03/2022  9698
16/03/2022  9743
17/03/2022  9881
18/03/2022  10116
19/03/2022  10649
20/03/2022  10866
21/03/2022  10524
22/03/2022  10261
23/03/2022  9872
24/03/2022  9412
25/03/2022  8988
26/03/2022  8523
27/03/2022  8263
28/03/2022  7874
29/03/2022  7416
30/03/2022  6889
31/03/2022  6563
01/04/2022  5985
02/04/2022  5352
03/04/2022  5128
04/04/2022  4813
05/04/2022  4470
06/04/2022  4231
07/04/2022  4016
08/04/2022  3852
09/04/2022  3632
10/04/2022  3535
11/04/2022  3457
12/04/2022  3388
13/04/2022  3296
14/04/2022  3272
15/04/2022  2692
16/04/2022  2228
17/04/2022  1995
18/04/2022  1661
19/04/2022  1718
20/04/2022  1748
21/04/2022  1607
22/04/2022  2012
23/04/2022  2134
24/04/2022  2264
25/04/2022  2255
26/04/2022  2256
27/04/2022  2261
28/04/2022  2289
29/04/2022  2303
30/04/2022  2362
01/05/2022  2324
02/05/2022  2511
03/05/2022  2280
04/05/2022  2071
05/05/2022  1878
06/05/2022  1695
07/05/2022  1604
08/05/2022  1550
09/05/2022  1508
10/05/2022  1484
11/05/2022  1492
12/05/2022  1474
13/05/2022  1438
14/05/2022  1387
15/05/2022  1417
16/05/2022  1415
17/05/2022  1397
18/05/2022  1345
19/05/2022  1317
20/05/2022  1279
21/05/2022  1231
22/05/2022  1205
23/05/2022  1177
24/05/2022  1158
25/05/2022  1155
26/05/2022  1156
27/05/2022  1176
28/05/2022  1274
29/05/2022  1271
30/05/2022  1278
31/05/2022  1280
01/06/2022  1282
02/06/2022  1290
03/06/2022  1323
04/06/2022  1204
05/06/2022  1199
06/06/2022  1064
07/06/2022  1097
08/06/2022  1106
09/06/2022  1103
10/06/2022  1075
11/06/2022  1150
12/06/2022  1175
13/06/2022  1325
14/06/2022  1327
15/06/2022  1337
16/06/2022  1337
17/06/2022  1343
18/06/2022  1347
19/06/2022  1345
20/06/2022  1338
21/06/2022  1316
22/06/2022  1330
23/06/2022  1405
24/06/2022  1260
25/06/2022  1236
26/06/2022  1223
27/06/2022  1315
28/06/2022  2195
29/06/2022  3075
30/06/2022  3867
01/07/2022  4990
02/07/2022  5359
03/07/2022  5517
04/07/2022  6527
05/07/2022  6859
06/07/2022  7631
07/07/2022  8384
08/07/2022  9103
09/07/2022  9566
10/07/2022  9770
11/07/2022  11129
12/07/2022  11862
13/07/2022  12520
14/07/2022  13320
15/07/2022  14105
16/07/2022  14109
17/07/2022  14020
18/07/2022  13566
19/07/2022  13588
20/07/2022  13214
21/07/2022  12585
22/07/2022  12084
23/07/2022  12004
24/07/2022  11997
25/07/2022  11497
26/07/2022  11136
27/07/2022  10795
28/07/2022  10645
29/07/2022  10299
30/07/2022  10212
31/07/2022  10127
01/08/2022  9952
02/08/2022  9826
03/08/2022  9610
04/08/2022  9371
05/08/2022  9064
06/08/2022  8925
07/08/2022  8950
08/08/2022  8698
09/08/2022  8358
10/08/2022  8089
11/08/2022  7741
12/08/2022  7483
13/08/2022  7364
14/08/2022  7279
15/08/2022  7058
16/08/2022  6963
17/08/2022  6888
18/08/2022  6786
19/08/2022  6627
20/08/2022  6536
21/08/2022  6526
22/08/2022  6357
23/08/2022  6160
24/08/2022  5919
25/08/2022  5705
26/08/2022  5528
27/08/2022  5439
28/08/2022  5426
29/08/2022  5245
30/08/2022  5001
31/08/2022  4750
01/09/2022  4542
02/09/2022  4355
03/09/2022  4208
04/09/2022  4146
05/09/2022  3924
06/09/2022  3727
07/09/2022  3557
08/09/2022  3446
09/09/2022  3260
10/09/2022  3284
11/09/2022  3291
12/09/2022  3308
13/09/2022  3287
14/09/2022  3252
15/09/2022  3176
16/09/2022  3099
17/09/2022  3022
18/09/2022  2989
19/09/2022  2882
20/09/2022  2690
21/09/2022  2584
22/09/2022  2461
23/09/2022  2343
24/09/2022  2291
25/09/2022  2279
26/09/2022  1927
27/09/2022  1890
28/09/2022  1798
29/09/2022  1737
30/09/2022  1665
01/10/2022  1629
02/10/2022  1602
03/10/2022  1882
04/10/2022  1912
05/10/2022  1940
06/10/2022  1982
07/10/2022  2053
08/10/2022  2046
09/10/2022  2050
10/10/2022  2054
11/10/2022  2040
12/10/2022  2071
13/10/2022  2092
14/10/2022  2188
15/10/2022  2305
16/10/2022  2348
17/10/2022  2455
18/10/2022  2596
19/10/2022  2674
20/10/2022  2724
21/10/2022  2638
22/10/2022  2534
23/10/2022  2486
24/10/2022  2095
25/10/2022  1950
26/10/2022  1907
27/10/2022  1843
28/10/2022  1900
29/10/2022  1933
30/10/2022  1966
31/10/2022  2272
01/11/2022  2302
02/11/2022  2284
03/11/2022  2306
04/11/2022  2271
05/11/2022  2254
06/11/2022  2238
07/11/2022  2212
08/11/2022  2176
09/11/2022  2128
10/11/2022  2055
11/11/2022  1954
12/11/2022  1924
13/11/2022  1925
14/11/2022  1893
15/11/2022  1832
16/11/2022  1801
17/11/2022  1920
18/11/2022  2061
19/11/2022  2151
20/11/2022  2185
21/11/2022  2219
22/11/2022  2308
23/11/2022  2315
24/11/2022  2173
25/11/2022  2070
26/11/2022  2027
27/11/2022  1995
28/11/2022  2007
29/11/2022  1998
30/11/2022  2064
01/12/2022  2115
02/12/2022  2082
03/12/2022  2116
04/12/2022  2145
05/12/2022  2119
06/12/2022  2119
07/12/2022  2076
08/12/2022  2045
09/12/2022  2059
10/12/2022  2016
11/12/2022  2008
12/12/2022  1987
13/12/2022  2066
14/12/2022  2141
15/12/2022  2240
16/12/2022  2346
17/12/2022  2386
18/12/2022  2385
19/12/2022  2430
20/12/2022  2376
21/12/2022  2225
22/12/2022  2049
23/12/2022  1828
24/12/2022  1622
25/12/2022  1535
26/12/2022  1230
27/12/2022  862
28/12/2022  682
29/12/2022  542
30/12/2022  444
31/12/2022  432
01/01/2023  436
02/01/2023  440
03/01/2023  452
04/01/2023  481
05/01/2023  528
06/01/2023  559
07/01/2023  596
08/01/2023  616
09/01/2023  750
10/01/2023  919
11/01/2023  937
12/01/2023  948
13/01/2023  956
14/01/2023  950
15/01/2023  955
16/01/2023  923
17/01/2023  849
18/01/2023  819
19/01/2023  755
20/01/2023  712
21/01/2023  705
22/01/2023  705
23/01/2023  649
24/01/2023  627
25/01/2023  585
26/01/2023  575
27/01/2023  563
28/01/2023  547
29/01/2023  543
30/01/2023  527
31/01/2023  516
01/02/2023  497
02/02/2023  478
03/02/2023  464
04/02/2023  451
05/02/2023  443
06/02/2023  406
07/02/2023  383
08/02/2023  374
09/02/2023  358
10/02/2023  344
11/02/2023  352
12/02/2023  352
13/02/2023  390
14/02/2023  359
15/02/2023  337
16/02/2023  319
17/02/2023  301
18/02/2023  290
19/02/2023  285
20/02/2023  278
21/02/2023  288
22/02/2023  292
23/02/2023  286
24/02/2023  267
25/02/2023  267
26/02/2023  262
27/02/2023  242
28/02/2023  223
01/03/2023  241
02/03/2023  289
03/03/2023  336
04/03/2023  347
05/03/2023  356
06/03/2023  405
07/03/2023  444
08/03/2023  456
09/03/2023  440
10/03/2023  436
11/03/2023  439
12/03/2023  444
13/03/2023  440
14/03/2023  438
15/03/2023  432
16/03/2023  442
17/03/2023  439
18/03/2023  434
19/03/2023  428
20/03/2023  413
21/03/2023  413
22/03/2023  407
23/03/2023  390
24/03/2023  378
25/03/2023  387
26/03/2023  386
27/03/2023  394
28/03/2023  392
29/03/2023  396
30/03/2023  416
31/03/2023  466
01/04/2023  1842
02/04/2023  2354
03/04/2023  5115
04/04/2023  7922
05/04/2023  10528
06/04/2023  13004
07/04/2023  12937
08/04/2023  12094
09/04/2023  11615
10/04/2023  8948
11/04/2023  8456
12/04/2023  8210
13/04/2023  8032
14/04/2023  10304
15/04/2023  10765
16/04/2023  11020
17/04/2023  13030
18/04/2023  13231
19/04/2023  13181
20/04/2023  13165
21/04/2023  12340
22/04/2023  12794
23/04/2023  12722
24/04/2023  12454
25/04/2023  9960
26/04/2023  9730
27/04/2023  9505
28/04/2023  10013
29/04/2023  9247
30/04/2023  9225
01/05/2023  8787
02/05/2023  10331
03/05/2023  8499
04/05/2023  6674
05/05/2023  4991
06/05/2023  4584
07/05/2023  4695
08/05/2023  3556
09/05/2023  2243
10/05/2023  2243
11/05/2023  2243
12/05/2023  2243
13/05/2023  2243
14/05/2023  2243
15/05/2023  2243
16/05/2023  2243
17/05/2023  2243
18/05/2023  2243
19/05/2023  2243
20/05/2023  2243
21/05/2023  2243
22/05/2023  2243
23/05/2023  2243
24/05/2023  2243
25/05/2023  2243
26/05/2023  2243
27/05/2023  2243
28/05/2023  2243
29/05/2023  2243
30/05/2023  2243
31/05/2023  2243
01/06/2023  2243
02/06/2023  2243
03/06/2023  2243
04/06/2023  2243
05/06/2023  2243
06/06/2023  2243
07/06/2023  2243
08/06/2023  2243
09/06/2023  2243
10/06/2023  2243
11/06/2023  2243
12/06/2023  2243
13/06/2023  2243
14/06/2023  2243
15/06/2023  2243
16/06/2023  2243
17/06/2023  2243
18/06/2023  2243
19/06/2023  2243
20/06/2023  2243
21/06/2023  2243
22/06/2023  2243
23/06/2023  2243
24/06/2023  2243
25/06/2023  2243
26/06/2023  2243
27/06/2023  2243
28/06/2023  2243
29/06/2023  2243
30/06/2023  2243
01/07/2023  2243
02/07/2023  2243
03/07/2023  2243
04/07/2023  2243
05/07/2023  2243
06/07/2023  2243
07/07/2023  2243
08/07/2023  2243
09/07/2023  2243
10/07/2023  2243
11/07/2023  2243
12/07/2023  2243
13/07/2023  2243
14/07/2023  2243
15/07/2023  2243
16/07/2023  2243
17/07/2023  2243
18/07/2023  2243
19/07/2023  2243
20/07/2023  2243
21/07/2023  2243
22/07/2023  2243
23/07/2023  2243
24/07/2023  2243
25/07/2023  2243
26/07/2023  2243
27/07/2023  2243
28/07/2023  2243
29/07/2023  2243
30/07/2023  2243
31/07/2023  2243
01/08/2023  2243
02/08/2023  2243
03/08/2023  2243
04/08/2023  2243
05/08/2023  2243
06/08/2023  2243
07/08/2023  2243
08/08/2023  2243
09/08/2023  2243
10/08/2023  2243
11/08/2023  2243
12/08/2023  2243
13/08/2023  2243
14/08/2023  2243
15/08/2023  2243
16/08/2023  2243
17/08/2023  2243
18/08/2023  2243
19/08/2023  2243
20/08/2023  2243
21/08/2023  2243
22/08/2023  2243
23/08/2023  2243
24/08/2023  2243
25/08/2023  2243
26/08/2023  2243
27/08/2023  2243
28/08/2023  2243
29/08/2023  2243
30/08/2023  2243
31/08/2023  2243
01/09/2023  2243
02/09/2023  2243
03/09/2023  2243
04/09/2023  2243
05/09/2023  2243
06/09/2023  2243
07/09/2023  2243
08/09/2023  2243
09/09/2023  2243
10/09/2023  2243
11/09/2023  2243
12/09/2023  2243
13/09/2023  2243
14/09/2023  2243
15/09/2023  2243
16/09/2023  2243
17/09/2023  2243
18/09/2023  2243
19/09/2023  2243
20/09/2023  2243
21/09/2023  2243
22/09/2023  2243
23/09/2023  2243
24/09/2023  2243
25/09/2023  2243
26/09/2023  2243
27/09/2023  2243
28/09/2023  2243
29/09/2023  2243
30/09/2023  2243
01/10/2023  2243
02/10/2023  2243
03/10/2023  2243
04/10/2023  2243
05/10/2023  2243
06/10/2023  2243
07/10/2023  2243
08/10/2023  2243
09/10/2023  2243
10/10/2023  2243
11/10/2023  2243
12/10/2023  2243
13/10/2023  2243
14/10/2023  2243
15/10/2023  2243
16/10/2023  2243
17/10/2023  2243
18/10/2023  2243
19/10/2023  2243
20/10/2023  2243
21/10/2023  2243
22/10/2023  2243
23/10/2023  2243
24/10/2023  2243
25/10/2023  2243
26/10/2023  2243
27/10/2023  2243
28/10/2023  2243
29/10/2023  2243
30/10/2023  2243
31/10/2023  2243
01/11/2023  2243
02/11/2023  2243
03/11/2023  2243
04/11/2023  2243
05/11/2023  2243
06/11/2023  2243
07/11/2023  2243
08/11/2023  2243
09/11/2023  2243
10/11/2023  2243
11/11/2023  2243
12/11/2023  2243
13/11/2023  2243
14/11/2023  2243
15/11/2023  2243
16/11/2023  2243
17/11/2023  2243
18/11/2023  2243
19/11/2023  2243
20/11/2023  2243
21/11/2023  2243
22/11/2023  2243
23/11/2023  2243
24/11/2023  2243
25/11/2023  2243
26/11/2023  2243
27/11/2023  2243
28/11/2023  2243
29/11/2023  2243
30/11/2023  2243
01/12/2023  2243
02/12/2023  2243
03/12/2023  2243
04/12/2023  2243
05/12/2023  2243
06/12/2023  2243
07/12/2023  2243
08/12/2023  2243
09/12/2023  2243
10/12/2023  2243
11/12/2023  2243
12/12/2023  2243
13/12/2023  2243
14/12/2023  2243
15/12/2023  2243
16/12/2023  2243
17/12/2023  2243
18/12/2023  2243
19/12/2023  2243
20/12/2023  2243
21/12/2023  2243
22/12/2023  2243
23/12/2023  2243
24/12/2023  2243
25/12/2023  2243
26/12/2023  2243
27/12/2023  2243
28/12/2023  2243
29/12/2023  2243
30/12/2023  2243
31/12/2023  2243
01/01/2024  2243
02/01/2024  2243
03/01/2024  2243
04/01/2024  2243
05/01/2024  2243
06/01/2024  2243
07/01/2024  2243
08/01/2024  2243
09/01/2024  2243
10/01/2024  2243
11/01/2024  2243
12/01/2024  2243
13/01/2024  2243
14/01/2024  2243
15/01/2024  2243
16/01/2024  2243
17/01/2024  2243
18/01/2024  2243
19/01/2024  2243
20/01/2024  2243
21/01/2024  2243
22/01/2024  2243
23/01/2024  2243
24/01/2024  2243
25/01/2024  2243
26/01/2024  2243
27/01/2024  2088
28/01/2024  1932
29/01/2024  1777
30/01/2024  1622
31/01/2024  1467
01/02/2024  1311
02/02/2024  1156
03/02/2024  1142
04/02/2024  1127
05/02/2024  1113
06/02/2024  1099
07/02/2024  1084
08/02/2024  1070
09/02/2024  1056
10/02/2024  1071
11/02/2024  1087
12/02/2024  1103
13/02/2024  1118
14/02/2024  1134
15/02/2024  1149
16/02/2024  1165
17/02/2024  1095
18/02/2024  1025
19/02/2024  955
20/02/2024  885
21/02/2024  815
22/02/2024  745
23/02/2024  675
24/02/2024  633
25/02/2024  590
26/02/2024  547
27/02/2024  504
28/02/2024  462
29/02/2024  419
01/03/2024  376
02/03/2024  467
03/03/2024  557
04/03/2024  647
05/03/2024  738
06/03/2024  828
07/03/2024  918
08/03/2024  1009
09/03/2024  1159
10/03/2024  1309
11/03/2024  1459
12/03/2024  1610
13/03/2024  1760
14/03/2024  1910
15/03/2024  2060
16/03/2024  1982
17/03/2024  1905
18/03/2024  1827
19/03/2024  1749
20/03/2024  1671
21/03/2024  1594
22/03/2024  1516
23/03/2024  1459
24/03/2024  1403
25/03/2024  1347
26/03/2024  1290
27/03/2024  1234
28/03/2024  1177
29/03/2024  1121
30/03/2024  1427
31/03/2024  1732
01/04/2024  2038
02/04/2024  2344
03/04/2024  2649
04/04/2024  2955
05/04/2024  3261
06/04/2024  3434
07/04/2024  3607
08/04/2024  3781
09/04/2024  3954
10/04/2024  4127
11/04/2024  4300
12/04/2024  4474
13/04/2024  4398
14/04/2024  4323
15/04/2024  4247
16/04/2024  4172
17/04/2024  4096
18/04/2024  4021
19/04/2024  3945
20/04/2024  3776
21/04/2024  3607
22/04/2024  3438
23/04/2024  3268
24/04/2024  3099
25/04/2024  2930
26/04/2024  2761
27/04/2024  2832
28/04/2024  2903
29/04/2024  2974
30/04/2024  3045
01/05/2024  3116
02/05/2024  3188
03/05/2024  3259
04/05/2024  3242
05/05/2024  3226
06/05/2024  3209
07/05/2024  3193
08/05/2024  3176
09/05/2024  3160
10/05/2024  3143
11/05/2024  3134
12/05/2024  3125
13/05/2024  3115
14/05/2024  3106
15/05/2024  3097
16/05/2024  3087
17/05/2024  3078
18/05/2024  3159
19/05/2024  3240
20/05/2024  3321
21/05/2024  3402
22/05/2024  3484
23/05/2024  3565
24/05/2024  3646
25/05/2024  3646
26/05/2024  3646
27/05/2024  3646
28/05/2024  3646
29/05/2024  3646
30/05/2024  3646
31/05/2024  3646
01/06/2024  3646
02/06/2024  3646
03/06/2024  3646
04/06/2024  3646
05/06/2024  3646
06/06/2024  3646
07/06/2024  3646
08/06/2024  3646
09/06/2024  3646
10/06/2024  3602
11/06/2024  3559
12/06/2024  3515
13/06/2024  3471
14/06/2024  3428
15/06/2024  3384
16/06/2024  3341
17/06/2024  3341
18/06/2024  3341
19/06/2024  3341
20/06/2024  3341
21/06/2024  3341
22/06/2024  3341
23/06/2024  3341
24/06/2024  3178
25/06/2024  3016
26/06/2024  2853
27/06/2024  2691
28/06/2024  2528
29/06/2024  2366
30/06/2024  2203
01/07/2024  2219
02/07/2024  2234
03/07/2024  2249
04/07/2024  2264
05/07/2024  2280
06/07/2024  2295
07/07/2024  2310
08/07/2024  2235
09/07/2024  2161
10/07/2024  2086
11/07/2024  2011
12/07/2024  1936
13/07/2024  1861
14/07/2024  1787
15/07/2024  1735
16/07/2024  1684
17/07/2024  1633
18/07/2024  1581
19/07/2024  1530
20/07/2024  1479
21/07/2024  1427
22/07/2024  1413
23/07/2024  1398
24/07/2024  1383
25/07/2024  1369
26/07/2024  1354
27/07/2024  1339
28/07/2024  1325
`;

// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     const policy = payload[0].payload;

//     const highlightJargon = (text, jargonList) => {
//       let highlightedText = text;
//       jargonList.forEach(jargon => {
//         const regex = new RegExp(`\\b${jargon}\\b`, 'gi');
//         highlightedText = highlightedText.replace(regex, `<span style="background-color: #ffe08c;">${jargon}</span>`);
//       });
//       return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
//     };

//     return (
//       <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', maxWidth: '300px' }}>
//         <h3 style={{ fontWeight: 'bold', marginBottom: '5px' }}>{policy.title}</h3>
//         <p>Date: {new Date(policy.date).toLocaleDateString()}</p>
//         <p>Readability score: {policy.readabilityScore.toFixed(2)}</p>
//         <p>Average sentence length: {policy.avgSentenceLength.toFixed(2)} words</p>
//         <p>Jargon percentage: {policy.jargonPercentage}%</p>
//         <p>Jargon used: {policy.jargon.join(', ')}</p>
//         <div style={{ marginTop: '10px' }}>
//           <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Policy excerpt (jargon highlighted):</h4>
//           <p style={{ fontSize: '0.9em' }}>
//             {highlightJargon(policy.content, policy.jargon)}
//           </p>
//         </div>
//       </div>
//     );
//   }
//   return null;
// };

const VaccinationTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
        <p>Date: {new Date(data.date).toLocaleDateString()}</p>
        <p>Daily Vaccinations: {data.vaccinations.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const SimpleDashboard = () => {
  const [vaccinationData, setVaccinationData] = useState([]);

  useEffect(() => {
    const parseVaccinationData = (dataString) => {
      const lines = dataString.trim().split('\n').slice(1); // Remove header and empty lines
      return lines.map(line => {
        const [dateStr, vaccinations] = line.trim().split(/\s+/);
        const [day, month, year] = dateStr.split('/');
        return {
          date: new Date(`${year}-${month}-${day}`).getTime(),
          vaccinations: parseInt(vaccinations, 10)
        };
      });
    };

    setVaccinationData(parseVaccinationData(vaccinationDataString));
  }, []);

  const allDates = [...policyData.map(d => d.date), ...data.map(d => d.date)];
  const minDate = Math.min(...allDates);
  const maxDate = Math.max(...allDates);
  setDateRange([minDate, maxDate]);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>NZ COVID-19 Response</h1>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Vaccine policy readability and uptake</h2>
      <p>This project looks at how the readability vaccine policy releases from the NZ government correlated with daily vaccines administered.
       The vaccine policy readability was analysed in terms of the percentage of jargon (determined by GPT-4) and the average sentence length (computed using a Python script with the regex library to parse sentences). The number of daily vaccination doses was obtained from World of Data github.</p>
      <div style={{ marginTop: '40px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Vaccine policy readability</h2>
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                name="Date" 
                tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                type="number"
                domain={[startDate, endDate]}
                label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                dataKey="readabilityScore" 
                name="Readability Score" 
                domain={[0, 100]}
                label={{ value: 'Readability score', angle: -90, position: 'insideLeft', offset: 0 }}
              />
              <ZAxis 
                dataKey="jargonPercentage" 
                range={[50, 400]} 
                name="Jargon Percentage"
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter name="Policy Readability" data={policyData} fill="#3ACFD4" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Daily vaccinations</h2>
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                name="Date" 
                tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                type="number"
                domain={[startDate, endDate]}
                label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                dataKey="vaccinations" 
                name="Daily Vaccinations"
                label={{ value: 'Daily vaccinations', angle: -90, position: 'insideLeft', offset: 0 }}
              />
              <Tooltip content={<VaccinationTooltip />} />
              <Scatter name="Daily Vaccinations" data={vaccinationData} fill="#FF6565" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;