# How to run this project  

This guide focuses Linux machines, Ubuntu in particular, 
but should be no issue to port it to another distro/OS as
long as it is compatible with Ruby.  

## Prerequisites  
Install a few packages from apt:
```bash
sudo apt-get install ruby-full build-essential zlib1g-dev
```
Update  your `~/.bashrc` with these env variables (e.g. using `vim`):
```
# Install Ruby Gems to ~/gems
GEM_HOME="$HOME/gems"
PATH="$HOME/gems/bin:$PATH"
```
Apply the changes in `~/.bashrc`:
```bash
source ~/.bashrc
```
Install Bundler and Jekyll:
```bash
gem install jekyll bundler
```  

## Clone  
```bash
git clone git@github.com:xonixx/cml-site-jekyll.git
```  

## Build    
Switch to project folder:
```bash
cd cml-site-jekyll
```
Install all required gems:
```bash
bundle install
```
If you encounter an error like 
```
'in find_spec_for_exe': can't find gem bundler (>= 0.a) (Gem::GemNotFoundException)
```
It is most likely that `Gemfile.lock` was built with a 
different version than you have installed. Look up the lock 
file for `BUNDLED WITH` text and install that Bundler version 
(as this text is written, it is `1.16.1` in the lock file):
```bash
gem install bundler -v 1.16.1
```

## Run  

### Console  
```bash
bundle exec jekyll serve -w
```  

### RubyMine  
Configure a new Gem Command run configuration:  

Configuration | Value
------------- | -----
| Gem name | `jekyll` |
| Executable name | `jekyll` |
| Arguments | `serve -w` |
