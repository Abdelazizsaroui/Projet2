App = {
    web3Provider: null,
    contracts: {},
    url: 'http://127.0.0.1:7545',
    init: function() {
      return App.initWeb3();
    },
  
    initWeb3: function() {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider;
      } else {
        App.web3Provider = new Web3.providers.HttpProvider(App.url);
      }
      web3 = new Web3(App.web3Provider);
  
      ethereum.enable();
  
      return App.initContract();
    },
  
    initContract: function() {
        $.getJSON('Certif.json', function(data) {
      var CertifArtifact = data;
      App.contracts.certif = TruffleContract(CertifArtifact);
  
      App.contracts.certif.setProvider(App.web3Provider);
      
      return App.bindEvents();
    });
    },
  
    bindEvents: function() {
      $(document).on('click', '#get-certif', App.getCertif);
      $(document).on('click', '#get-length', App.getLength);
      $(document).on('click', '#add-certif', App.getLength);
    },
  
    getCertif: function() {
      var certifInstance;
  
      web3.eth.getAccounts(function(error, accounts) {
        var account = accounts[0];
        console.log(account);
        App.contracts.certif.deployed().then(function(instance) {
          certifInstance = instance;
          console.log(certifInstance);
          // return certifInstance.getCertif();
          console.log(certifInstance.getCertif());
        })
      });
    },

    getLength: function() {
        var certifInstance;
    
        web3.eth.getAccounts(function(error, accounts) {
          var account = accounts[0];
    
          App.contracts.certif.deployed().then(function(instance) {
            certifInstance = instance;
    
            console.log(certifInstance.getLength());
          })
        });
    },
  
    addCertif: function() {
        var certifInstance;
    
        web3.eth.getAccounts(function(error, accounts) {
          var account = accounts[0];
    
          App.contracts.certif.deployed().then(function(instance) {
            certifInstance = instance;
    
            console.log(certifInstance.addCertif("testtest000").send());
          })
        });
    },
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  