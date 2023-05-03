export default () => ({
    port: parseInt(process.env.PORT, 10) || 443,
    http: {
      host: 'www.slimport.absturzsicherung.de',
      port: 443
    }
  });