# Create virtual environment
python3 -m venv RBPGuide

# Activate new environment
source RBPGuide/bin/activate
which python3

# list installed python dependencies/packages
pip freeze > requirements.txt

# Install python dependencies
pip install -r requirements.txt

# Serve site locally
mkdocs serve 

#specify IP and port
#mkdocs serve -a 127.0.0.1:8001

# Build site for remote
mkdocs build 

# Publish manually https://squidfunk.github.io/mkdocs-material/publishing-your-site/?h=publish
# Build  documentation and deploy it to a branch gh-pages in your repository.
# This does not push the source 
mkdocs gh-deploy --force 

# push source to main branch

# check spelling an grammar
# print to pdf and import to GDocs/other and check

# check links
# see checklinks.sh

# remove site header about under construction
# edit / remove docs/overrides/main.html