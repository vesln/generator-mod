/**
 * Dependencies
 */

var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');
  },

  askForModuleName: function() {
    var self = this;
    var done = this.async();

    var prompts = [{
      name: 'name',
      message: 'Name',
      default: path.basename(process.cwd()),
    }];

    this.prompt(prompts, function(props) {
      self.name = props.name;
      done();
    });
   },

  askFor: function() {
    var self = this;
    var cb = this.async();

    var prompts = [{
      name: 'description',
      message: 'Description',
      default: ''
    }, {
      name: 'org',
      message: 'Organization or User',
      default: 'vesln'
    }];

    this.currentYear = (new Date()).getFullYear();

    this.prompt(prompts, function(props) {
      props.name = self.name;
      props.repoUrl = 'https://github.com/' + props.org + '/' + props.name;
      self.props = props;
      cb();
    });
  },

  app: function() {
    this.copy('gitignore', '.gitignore');
    this.copy('travis.yml', '.travis.yml');

    this.template('_README.md', 'README.md');
    this.template('_CHANGELOG.md', 'CHANGELOG.md');
    this.template('_LICENSE', 'LICENSE');
    this.template('_package.json', 'package.json');
  },

  projectfiles: function() {
    this.mkdir('lib');
    this.template('lib/name.js', 'lib/' + this.props.name + '.js');
    this.mkdir('test');
  },

  install: function() {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});
