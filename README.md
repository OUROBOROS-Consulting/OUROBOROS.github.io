> site/
>> _config.yml              # Site-wide settings, collection definitions
>>  _layouts/                # Your HTML templates live here
>>> default.html         # Base layout (nav + footer shell)
>>> home.html            # Extends default — the landing page
>>> essay.html           # Extends default — blog/essay template
>>> project.html         # Extends default — project writeup template
>> note.html            # Extends default — reading notes template
>>> cv.html              # Extends default — CV page

>>  _includes/               # Reusable HTML fragments
>>> nav.html
>>> footer.html
>>> card.html            # The .card pattern, usable anywhere

>>  _essays/                 # One .md file per essay
>>> model-vs-story.md

>>  _projects/               # One .md file per project
>>> abcd-spatiotemporal.md

>>  _notes/                  # One .md file per reading note
>>> regression-other-stories.md

>>  _data/                   # YAML/JSON data files
>>> shelf.yml            # Your books and albums
>>> nav.yml              # Nav links (optional)

>>  _sass/                   # If you split your CSS out (optional)
>>> main.scss

>  assets/
> css/
>>> main.css         # Or compiled from _sass
>>> js/
>>> main.js          # TikZ renderer, switchTab, etc.
>>> files/

>>  index.html               # Home page (uses home layout)
>>  cv.html                  # CV page (uses cv layout)
>>  essays.html              # Essay index/listing page
>>  projects.html            # Projects index page
>> └── notes.html            # Reading notes index page
