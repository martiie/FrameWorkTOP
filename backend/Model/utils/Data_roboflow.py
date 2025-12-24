# from roboflow import Roboflow
# rf = Roboflow(api_key="rHgjfgSU1qDFyM9ePHbA")
# project = rf.workspace("top-7dlf7").project("sled_mdp-fwp1e")
# version = project.version(5)
# dataset = version.download("yolov11")
                

from roboflow import Roboflow
rf = Roboflow(api_key="rHgjfgSU1qDFyM9ePHbA")
project = rf.workspace("top-7dlf7").project("sled_pzt-pk08d")
version = project.version(2)
dataset = version.download("yolov11")
                