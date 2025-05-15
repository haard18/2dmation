from manim import *

class GravityScene3(Scene):
    def construct(self):
        earth = Circle(radius=1, color=BLUE, fill_opacity=0.7).shift(LEFT*3)
        sun = Circle(radius=2, color=YELLOW, fill_opacity=0.7).shift(RIGHT*3)
        person = Circle(radius=0.2, color=PURPLE, fill_opacity=0.8).shift(ORIGIN)
        
        earth_label = Text("Earth").next_to(earth, DOWN)
        sun_label = Text("Sun").next_to(sun, DOWN)
        person_label = Text("You").next_to(person, UP)


        arrow1 = Arrow(person.get_center(), earth.get_center(), buff=0.3, stroke_width=2, color=GREEN_D)
        arrow2 = Arrow(earth.get_center(), sun.get_center(), buff=0.3, stroke_width=4, color=ORANGE)

        arrow1.set_opacity(0.5)
        arrow2.set_opacity(0.5)

        self.play(Create(earth), Write(earth_label), Create(sun), Write(sun_label), Create(person), Write(person_label))
        self.wait(1)
        self.play(Create(arrow1), Create(arrow2))
        self.wait(2)