"""

From the study:
We designed our LSTM with a single LSTM layer with 32 nodes
and a dropout of 0.2. Drop-outs were used between the LSTM
and dense layers. The output of the last cell of the LSTM layer
was connected to a dense layer. Finally, a sigmoid activation
layer predicted the high/low stress levels. We trained our
LSTM using RMSprop [20] with binary cross-entropy loss
and an iteration number of 1000. The whole algorithm was
implemented using deep learning frameworks Keras 2.1.3 and
Python 3.5.4.

"""

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

lstm = tf.keras.layers.LSTM(4)