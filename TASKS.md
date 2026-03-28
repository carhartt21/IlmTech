# Tasks

## Completed

### Hero SVG cleanup & interactive features rework
- Removed all windows from house SVG (arched windows paths 28-36, small windows 54-55, roof crosshair 56-58)
- Removed all circular icon elements and connection lines (paths 85-147): eye, lightbulb, lock, energy pin, cooking icons + cyan dashed lines
- Made HouseFeatures (interactive hotspot icons) always visible with subtle accent-blue styling
- Repositioned all 7 features to plausible house locations:
  - Sicherheit → front door area (44%, 78%)
  - Beleuchtung → upper-left window area (36%, 56%)
  - Heizung → upper-right window area (53%, 56%)
  - Energiemanagement → roof center (44%, 42%)
  - Smart-Geräte → ground floor left (36%, 74%)
  - Photovoltaik → upper roof (50%, 38%)
  - Wallbox / EV → garage area (72%, 80%)
- Tooltip descriptions still appear on hover/click

### New services & technologies added
- Added 5 new services to homepage and Leistungen page: Heizung & Klima, Videoüberwachung, Dashboard-Entwicklung, ESPHome & DIY-Sensorik, Sensoren & Monitoring
- Added "Technologien & Standards" section to homepage with 6 tag categories
- Created 4 new icon components: CameraIcon, CpuIcon, LayoutIcon, DropletIcon

### SVG right-side removal
- Removed right-side building structure (paths 148-155) from hero_smart_home.svg
- Changed viewBox width from 441.29 to 270
- Recalculated all feature x-positions by factor 1.634
