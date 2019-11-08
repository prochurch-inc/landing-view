module.exports = {
  methods: {
    replaceTags(string, user, team) {
      let service = JSON.parse(team.locations[0].service_times);
      string = string.replace('{church-city}', team.locations[0].addressLocality);
      string = string.replace('{user-name}', user.name);
      string = string.replace('{church-name}', team.name);
      string = string.replace('{service-time1}', service[0].time);
      string = string.replace('{church-campus}', team.locations[0].name);
      string = string.replace('{church-website}', team.locations[0].web_url);
      return string;
    }
  }
};