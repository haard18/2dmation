from manim import *

class GravityScene2(Scene):
    def construct(self):
        earth = Circle(radius=1.5, color=BLUE, fill_opacity=0.7).shift(LEFT*2)
        moon = Circle(radius=0.5, color=GRAY, fill_opacity=0.7).shift(RIGHT*3 + UP*2)
        moon_orbit = Circle(radius=3, arc_center=earth.get_center(), color=YELLOW_D, stroke_width=2, stroke_opacity=0.5)

        earth_label = Text("Earth").next_to(earth, UP)
        moon_label = Text("Moon").next_to(moon, RIGHT)

        arrow1 = Arrow(moon.get_center(), earth.get_center(), buff=0.2, stroke_width=3, max_tip_length_to_length_ratio=0.15)
        arrow1.set_opacity(0.5)

        self.play(Create(earth), Write(earth_label))
        self.play(Create(moon), Write(moon_label))
        self.play(Create(moon_orbit))
        self.play(Create(arrow1))
        self.wait(2)


        #Simulate moon's orbit (simplified)
        self.play(Rotate(moon, angle=TAU/4, about_point=earth.get_center()), run_time=3)
        self.play(Rotate(moon, angle=TAU/4, about_point=earth.get_center()), run_time=3)