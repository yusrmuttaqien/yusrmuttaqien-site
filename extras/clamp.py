print("<min value> <min screen> <max value> <max screen> (all in px)")
x = input()

x = x.split(" ")
x = [int(i) for i in x]

# convert min & max value to rem
min = round(x[0] / 16, 3)
max = round(x[2] / 16, 3)
# calculate vw value
vw = (100 * (x[2] - x[0])) / (x[3] - x[1])
vw = round(vw)
# calculate rem value
rem = ((x[1] * x[2]) - (x[3] * x[0])) / (x[1] - x[3])
rem = round(rem / 16, 3)

print(f"clamp({min}rem, {vw}vw + {rem}rem, {max}rem)")
