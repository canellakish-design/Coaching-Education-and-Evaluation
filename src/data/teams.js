// Team roster for the 2026–27 season. Used to bucket teams into the two
// schedule tracks shown above the module list (see SCHEDULE in
// CoachingEvaluation.jsx). `track` is derived from the team's age number:
// U9–U14 follow the "9-14" track, U15–U19 follow the "15-18" track.
// GK Coach isn't age-bound, so `track` is null — it isn't shown in either
// schedule column.
export const TEAMS = [
  { name: "U9 Academy Red", birthWindow: "8/1/2017-7/31/2018", coaches: ["Andrew Gillis", "Sarah Toche-Manley"], email: "andrew.gillis@mdunitedfc.org", track: "9-14" },
  { name: "U9 Academy White", birthWindow: "8/1/2017-7/31/2018", coaches: ["Andrew Gillis", "Sarah Toche-Manley"], email: "andrew.gillis@mdunitedfc.org", track: "9-14" },
  { name: "U10 Red", birthWindow: "8/1/2016-7/31/2017", coaches: ["Andrew Gillis", "Sarah Toche-Manley"], email: "andrew.gillis@mdunitedfc.org", track: "9-14" },
  { name: "U10 White", birthWindow: "8/1/2016-7/31/2017", coaches: ["Clarissa Kirsch Downs"], email: "clarissa.downs@mdunitedfc.org", track: "9-14" },
  { name: "U11 ECNL", birthWindow: "8/1/2015-7/31/2016", coaches: ["Steve Campbell", "Rob Garrick"], email: "steve.campbell@mdunitedfc.org", track: "9-14" },
  { name: "U11 PRE-ECNL RL", birthWindow: "8/1/2015-7/31/2016", coaches: ["Andrew Gillis"], email: "andrew.gillis@mdunitedfc.org", track: "9-14" },
  { name: "U12 ECNL", birthWindow: "8/1/2014-7/31/2015", coaches: ["Steve Campbell", "Rob Garrick"], email: "steve.campbell@mdunitedfc.org", track: "9-14" },
  { name: "U13 ECNL", birthWindow: "8/1/2013-7/31/2014", coaches: ["Darrell Gonzalez"], email: "darrell.gonzalez@mdunitedfc.org", track: "9-14" },
  { name: "U14 ECNL", birthWindow: "8/1/2012-7/31/2013", coaches: ["Scott Villagran"], email: "scott.villagran@mdunitedfc.org", track: "9-14" },
  { name: "U15 ECNL", birthWindow: "8/1/2011-7/31/2012", coaches: ["Scott Villagran"], email: "scott.villagran@mdunitedfc.org", track: "15-18" },
  { name: "U16 ECNL", birthWindow: "8/1/2010-7/31/2011", coaches: ["Harry Canellakis"], email: "harry.canellakis@mdunitedfc.org", track: "15-18" },
  { name: "U17 ECNL", birthWindow: "8/1/2009-7/31/2010", coaches: ["Matt Dwyer"], email: "matt.dwyer@mdunitedfc.org", track: "15-18" },
  { name: "U18/19 ECNL", birthWindow: "8/1/2007-7/31/2009", coaches: ["Matt Dwyer"], email: "matt.dwyer@mdunitedfc.org", track: "15-18" },
  { name: "U12 ECNL RL", birthWindow: "8/1/2014-7/31/2015", coaches: ["KJ Davis"], email: "kj.davis@mdunitedfc.org", track: "9-14" },
  { name: "U13 ECNL RL", birthWindow: "8/1/2013-7/31/2014", coaches: ["KJ Davis"], email: "kj.davis@mdunitedfc.org", track: "9-14" },
  { name: "U14 ECNL RL", birthWindow: "8/1/2012-7/31/2013", coaches: ["Darrell Gonzalez"], email: "darrell.gonzalez@mdunitedfc.org", track: "9-14" },
  { name: "U15 ECNL RL", birthWindow: "8/1/2011-7/31/2012", coaches: ["Sara Butler"], email: "sara.butler@mdunitedfc.org", track: "15-18" },
  { name: "U16 ECNL RL", birthWindow: "8/1/2010-7/31/2011", coaches: ["Win Puffer"], email: "win.puffer@mdunitedfc.org", track: "15-18" },
  { name: "U17 ECNL RL", birthWindow: "8/1/2009-7/31/2010", coaches: ["Darrell Gonzalez"], email: "darrell.gonzalez@mdunitedfc.org", track: "15-18" },
  { name: "U18/19 ECNL RL", birthWindow: "8/1/2007-7/31/2009", coaches: ["Win Puffer"], email: "win.puffer@mdunitedfc.org", track: "15-18" },
  { name: "U15 Premier", birthWindow: "8/1/2010-7/31/2011", coaches: ["Clarissa Kirsch Downs"], email: "clarissa.downs@mdunitedfc.org", track: "15-18" },
  { name: "U16 Premier", birthWindow: "8/1/2007-7/31/2009", coaches: ["Clarissa Kirsch Downs"], email: "clarissa.downs@mdunitedfc.org", track: "15-18" },
  { name: "GK Coach", birthWindow: null, coaches: ["Joe Mallia"], email: "joe.mallia@mdunitedfc.org", track: null },
];
